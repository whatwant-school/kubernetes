
## Book1 #1 : Copy Stateful Pod

### p435, 그림 10-2 : 각자 스토리지를 갖는 Pod
- 이런 경우 자유롭게 Replica-set을 늘려주기 어렵다

### p436, 그림 10-3 : 공유 스토리지를 갖는 Pod
- 디렉토리 분리가 되어 있으면 어짜피 의미 없다 ?!

### p439, 가축 vs 애완동물
- 대체 가능한 Pod


## Book1 #2 :ReplicaSet vs StatefulSet

### p441, 그림 10.5
- StatefulSet으로 생성된 Pod는 예측 가능한(숫자) 이름을 갖는다.

### p441 : 거버닝 서비스
- Headless Service
  - Headless를 위한 Pod는 이를 위한 서비스의 하위로 붙는다?
  - 그러다보니 domain이 한단계 더 붙는다 ?! 4자리...
  - 앞의 서비스가 3자리 도메인을 갖기에 ?!

### p443, 그림 10.6 : 순차적으로 kill
- 그래서, 예측 가능하다 ?!

### p445, 그림 10.8 : 스토리지도 안정적이어야 한다
- 그래서, volume claim을 갖을 수 있다.

### p446 & p447, 그림 10.9
- 추가는 볼륨도 같이 생성, 삭제는 Pod만 삭제 & 볼륨은 유지


## Book1 #3 : StatefulSet 실습

- 실습 ...


## Book1 #4 : StatefulSet Peer Discovery

### P462 : StatefuleSet의 member가 다른 peer를 찾기
- DNS를 이용해서 찾을 수 있다.
- p465에 있는 nodejs 코드를 보면 다른 친구들을 DNS를 이용해서 찾고 있는 것을 볼 수 있다.
- p466, 그림 10.12 를 보면 알 수 있다.

### p463, SRV
- DNS 레코드 타입 中 SRV 를 이용하면 찾을 수 있다.

### p467, upadte
- 수작업으로 kill 해야 업데이트 한다

### p468 : 저장소 다 긁어오기
- 하나에만 명령을 내리면 있는 전부를 긁어와서 리턴한다.


## Book1 #5 : Delete StatefulSet Pod

### p472 : delete Pod
- 죽여도 안죽는다 ?!
- 강제로 죽이는건 위험하다.


## Extra

### Stateful ...
- 일반적인 웹서비스는 k8s 입장에서는 stateless 이다.
- 하지만 DB 같은 아이들을 clustering 하게 구성한다면 이는 stateful 하게 구성해야 한다.
- Sample
  - https://kubedb.com/docs/0.10.0/concepts/what-is-kubedb/overview/
  - https://github.com/kubedb
- 아래 내용을 보면 StatefuleSet으로 구성되었음을 볼 수 있다.
  - https://kubedb.com/docs/0.10.0/concepts/databases/mongodb/

