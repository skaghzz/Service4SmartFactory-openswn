# Service4SmartFactory-openswn
IoT 무선 네트워크 기반 스마트팩토리 작업자 지원 서비스

## 설명
- 2017년 하반기 정보컴퓨터공학부 졸업과제
- [자세한 내용은 여기.pdf](./최종보고서_IoT%20무선%20네트워크%20기반%20스마트팩토리%20작업자%20지원%20서비스.pdf)
- [시연영상 youtube](http://img.youtube.com/vi/bT2o0SEFjhQ/0.jpg)

## usage manual
### openwsn
1. MinGW 설치
   - Install at C:\MingGW\
   - Mark the following packages for installation:
      ming32-base
      msys-base
   - Select "Installation > Apply Changes" to download and install those packages. This will download and install the packages.
   - Add C:\MinGW\bin to your PATH environment variable
2. Python 2.7.x version 설치
3. sw 프로그램을 위한 설치
    - C:\Users\Thomas\Desktop\openwsn-sw> pip install -r requirements.txt
4. scons 프로그램 설치
   - C:\Users\Thomas\Desktop\openwsn-sw> pip install --egg scons
5. Tun 설치
  - https://openwsn.atlassian.net/wiki/spaces/OW/pages/5963792/Install+tun
6. TelosB 모트 (CM-MTM5000 <msp430f1611>)를 USB에 연결
7. USB 포트를 알아낸 후 명령어 실행
   - TelsoB에 펌웨어 Write
   C:\Users\Thomas\Desktop\openwsn-fw>scons board=telosb toolchain=mspgcc bootload=COM4,COM5,COM6 oos_openwsn

   - 컴퓨터의 network 시작
   C:\Users\Thomas\Desktop\openwsn-sw\software\openvisualizer>scons runweb

   - 웹 브라우저의 localhost:8080 페이지 접속 및 모트 상황 확인

- 참고 :  https://openwsn.atlassian.net/wiki/spaces/OW/pages/29884450/Kickstart+Windows

- 서버 및 클라이언트에서 위의 과정 동일하게 실행

### Apppplication service
#### - Server
##### 서버 측 미들웨어 실행
- coap\tests\Server.py
- python Server.py로 cmd에서 실행

##### 서버 측 웹서버 실행
1. Node.js 설치
	- 참고 : https://nodejs.org/ko/
2. 사전 정의된 패키지 설치
	- C:\Users\Thomas\Desktop\WebApplication_Server>npm install
3. 서버 측 몽고DB 실행
   - MongoDB 설치
   - https://www.mongodb.com/download-center?jmp=nav#community
   - 디렉터리 생성
     - C:\data\db
   - 실행
     - cd mongodb
     - cd mongodb-win32-x86_64-2.x.x
     - cd bin
     - mongod
1. node.js 서버 실행
	- C:\Users\Thomas\Desktop\WebApplication_Server>node server.js

#### - Client
##### 클라이언트 측 미들웨어 실행
- coap\tests\Client.py
- python Client.py로 cmd에서 실행

##### 클라이언트 측 작업자 애플리케이션 실행
1. Node.js 설치(6.x 버전)
	- 참고 : https://nodejs.org/ko/
2. Ionic 설치
    - C:\Users\Thomas\Desktop\WebApplication>sudo npm install -g ionic cordova
	- C:\Users\Thomas\Desktop\WebApplication>npm install
	- 참고 : https://ionicframework.com/
3. 로컬 서버 실행
	- C:\Users\Thomas\Desktop\WebApplication>node server.js
4. 애플리케이션 실행
	- C:\Users\Thomas\Desktop\WebApplication>ionic serve
	