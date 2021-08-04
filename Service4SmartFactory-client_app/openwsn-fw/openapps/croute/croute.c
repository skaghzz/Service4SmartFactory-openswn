/**
\brief An example CoAP application.
*/

#include "opendefs.h"
#include "croute.h"
#include "opencoap.h"
#include "openqueue.h"
#include "openserial.h"

#include "idmanager.h"
#include "IEEE802154E.h"

#include "icmpv6rpl.h"

//=========================== defines =========================================

const uint8_t croute_path0[] = "route";

//=========================== variables =======================================

croute_vars_t croute_vars;

//=========================== prototypes ======================================

owerror_t croute_receive(OpenQueueEntry_t* msg,
                    coap_header_iht*  coap_header,
                    coap_option_iht*  coap_options);

void    croute_sendDone(OpenQueueEntry_t* msg,
                       owerror_t error);

//=========================== public ==========================================

void croute_init() {
   
   // prepare the resource descriptor for the /route path
   croute_vars.desc.path0len             = sizeof(croute_path0)-1;
   croute_vars.desc.path0val             = (uint8_t*)(&croute_path0);
   croute_vars.desc.path1len             = 0;
   croute_vars.desc.path1val             = NULL;
   croute_vars.desc.componentID          = COMPONENT_CROUTE;
   croute_vars.desc.discoverable         = TRUE;
   croute_vars.desc.callbackRx           = &croute_receive;
   croute_vars.desc.callbackSendDone     = &croute_sendDone;

     
   opencoap_register(&croute_vars.desc);
}

//=========================== private =========================================

owerror_t croute_receive(OpenQueueEntry_t* msg,
                      coap_header_iht* coap_header,
                      coap_option_iht* coap_options) {

	owerror_t outcome;
	uint8_t PUT_flag = E_FAIL;
   uint8_t i = 0, changed_type = ' ';
   uint8_t new_Period_upper = 0;
   uint8_t new_Period_lower = 0;

	switch (coap_header->Code) {
		case COAP_CODE_REQ_GET:
			msg->payload = &(msg->packet[127]);
			msg->length = 0;

			packetfunctions_reserveHeaderSize(msg, 55);
			msg->payload[0] = COAP_PAYLOAD_MARKER;

         for(i = 0; i < 55; i++){
            msg->payload[i+1] = i+65; 
         }
			
			coap_header->Code = COAP_CODE_RESP_CONTENT;

			outcome = E_SUCCESS;
			break;
      //------------------------------------------case GET
		case COAP_CODE_REQ_PUT:
         if(msg->l4_destination_port == WKP_UDP_COAP_ROUTE){    // Destination UDP Port #5683
            if((msg->payload[0] == DIO_PERIOD) &&
               (msg->payload[1] == CROUTE_SEPERATOR) &&
               (msg->payload[4] == MARKER_END)) {               // SET DIO Period
               new_Period_upper = (msg->payload[2] - 48);
               new_Period_lower = (msg->payload[3] - 48);
               icmpv6rpl_setDIOPeriod(((new_Period_upper*10) + new_Period_lower) * 1000);      // void (uint32_t dioPeriod)
               changed_type = 'I';
               PUT_flag = E_SUCCESS;
                        }
            else if((msg->payload[0] == DAO_PERIOD) &&
               (msg->payload[1] == CROUTE_SEPERATOR) &&
               (msg->payload[4] == MARKER_END)) {               // SET DAO Period
			   new_Period_upper = (msg->payload[2] - 48);
               new_Period_lower = (msg->payload[3] - 48);
               icmpv6rpl_setDAOPeriod(((new_Period_upper*10) + new_Period_lower) * 1000);      // void (uint16_t daoPeriod)
               changed_type = 'A';
               PUT_flag = E_SUCCESS;
                        }
            else{                                                       // Received Undefined VALUE
               PUT_flag = E_FAIL;
                        }

            msg->payload = &(msg->packet[127]);
            msg->length = 0;

   			if (PUT_flag == E_SUCCESS) {                                // Response with changed Value
   				packetfunctions_reserveHeaderSize(msg, 11);
   				msg->payload[0] = COAP_PAYLOAD_MARKER;

   				msg->payload[1]  = 'D';
   				msg->payload[2]  = changed_type;
   				msg->payload[3]  = 'O';
   				msg->payload[4]  = ' ';
   				msg->payload[5]  = new_Period_upper + 48;
   				msg->payload[6]  = new_Period_lower + 48;
   				msg->payload[7]  = ' ';
   				msg->payload[8]  = 'P';
   				msg->payload[9]  = 'U';
   				msg->payload[10] = 'T';
   			}
            else if(PUT_flag == E_FAIL){                                // Response with error
               packetfunctions_reserveHeaderSize(msg, 8);
               msg->payload[0] = COAP_PAYLOAD_MARKER;

               msg->payload[1] = 'D';
               msg->payload[2] = changed_type;
               msg->payload[3] = 'O';
               msg->payload[4] = ' ';
               msg->payload[5] = 'E';
               msg->payload[6] = 'R';
               msg->payload[7] = 'R';
            }
         }

         coap_header->Code = COAP_CODE_RESP_CONTENT;
         outcome = E_SUCCESS;

         break;
         //------------------------------------------case PUT
		default:
			outcome = E_FAIL;
			break;
	}  // end switch-case

   return outcome;
}

void croute_sendDone(OpenQueueEntry_t* msg, owerror_t error) {
   openqueue_freePacketBuffer(msg);
}