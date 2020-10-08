# Pack-Man



## 1. 로그인

로그인은 간단하게 ID, PW 입력을 통해 DB를 확인하여 로그인을 진행

```mermaid
sequenceDiagram

FrontPage->>DjangoServer:ID/PW입력
DjangoServer->>DB : 회원정보 확인
DB -->> FrontPage: 로그인 완료
```

## 2. 회원가입

E-mail을 ID로 사용하여 회원가입 진행

```mermaid
sequenceDiagram

FrontPage ->> DjangoServer : 회원정보 입력 및 전송 

DjangoServer ->> DB : 회원정보 저장
DB -->> DjangoServer : 성공코드
DjangoServer -->> FrontPage : 성공코드

```

## 3. 체크리스트 조회

달력에서 날짜 선택 후 저장된 체크리스트 불러오기

```mermaid
sequenceDiagram

FrontPage ->> DjangoServer : 회원정보 및 날짜 전송 

DjangoServer ->> DB : 체크리스트 조회
DB -->> DjangoServer : 체크리스트
DjangoServer -->> FrontPage : 체크리스트
```



## 4. 체크리스트 저장

달력에서 날짜 선택 후 새로운 체크리스트 생성

```mermaid
sequenceDiagram

FrontPage ->> DjangoServer : 회원정보 및 날짜, 체크리스트 전송 

DjangoServer ->> DB : 체크리스트 저장
DB -->> DjangoServer : 성공코드
DjangoServer -->> FrontPage : 성공코드
```



## 5. 체크리스트 비교

- 체크리스트 선택 후 물건들의 사진을 바탕으로 생성된 체크리스트와 비교
- 체크리스트 수정 후 갱신

```mermaid
sequenceDiagram

FrontPage ->> DjangoServer : 체크리스트 및 사진 전송

DjangoServer ->> Tensorflow : Object Detection
Tensorflow -->> DjangoServer : Objects
DjangoServer -->> FrontPage : Object List

FrontPage ->> FrontPage : 체크리스트 비교 및 수정
FrontPage ->> DjangoServer : 체크리스트 갱신

DjangoServer -->> FrontPage : 성공코드
```