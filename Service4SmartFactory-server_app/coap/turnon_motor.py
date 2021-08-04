

'''
class timerClass(threading.Thread):

    def __init__(self):
        threading.Thread.__init__(self)
        self.delay   = 1
        self.state   = True
        self.handler = None

    def setDelay(self, delay):
        self.delay = delay

    def run(self):
        while self.state:
            print 'timer start'
            time.sleep(self.delay)

            if(self.handler != None):
                self.handler()

    def end(self):
        print 'timer end'
        self.state = False

    def setHandler(self, handler):
        self.handler = handler






def _reinitVars():
    print 'timer timeout'

Instruction_timer = timerClass()
Instruction_timer.setHandler(_reinitVars)
Instruction_timer.setDelay(60)
Instruction_timer.start()
'''

'''

def shorterIpv6addr(addr):
    addr_arr   = addr.split(':')
    total_sum  = 0
    index      = len(addr_arr)
    
    for i in range(index):
        if(int(addr_arr[0]) == 0):
            addr_arr.pop(0)
        else:
            return ':'.join(addr_arr)


print shorterIpv6addr('0:0:0:2')
print shorterIpv6addr('1415:9200:0:2')
print shorterIpv6addr('0:1234:0:2')
print shorterIpv6addr('0:00:1:2')

'''


import os
import signal
import sys
here = sys.path[0]
sys.path.insert(0, os.path.join(here,'..'))

import threading
from   coap   import    coap,                    \
                        coapResource,            \
                        coapDefines as d
# open
c = coap.coap(udpPort=5683)




link = 'coap://[bbbb::1415:9200:13e1:b83c]:5683/gpio'
#link = 'coap://[bbbb::1415:9200:1862:0cbd]:5683/gpio'
payload_str = '0x'

print link

response = c.PUT(
        link,
        payload=[ord(b) for b in payload_str]
)

print_str = ''
for r in response:
    print_str += chr(r)
print 'response : ' + print_str

# let the server run
raw_input('\n\nServer running. Press Enter to close.\n\n')

# close
#c.close()
os.kill(os.getpid(), signal.SIGTERM)