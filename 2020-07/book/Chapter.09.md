## 준비

### Link
- https://github.com/psyoblade/kubernetes-in-action/tree/master/Chapter09

### out of date
- 책의 실습 코드 中 out of date 된 내용이 있어서 업데이트 필요하다
- 위의 링크 참고

### minikube tunnel
- 외부와 통신을 위해서 tunnel 셋팅하면 된다 ?!
```
$ minikube tunnel
```
- 이거... 그냥 minikube 접속하는 것 같은데...
  - http://itnp.kr/post/istio-task-environment
- 매뉴얼 확인
  - https://minikube.sigs.k8s.io/docs/commands/ssh/
  - https://minikube.sigs.k8s.io/docs/commands/tunnel/


## Book #1

### Replica Set vs Replication Controller
- Replica Set이 추천하는 것이다.
- Deployment와 궁합이 맞는 것도 Replica Set


## Book #2 - Rolling-Update

### p392, 그림 9.2
- Replacation Set에 v2 등록해놓고, Pod를 수작업으로 kill(delete) 해버리면 바뀐다.

### p393, 그림 9-3
- selector 변경을 통해 한 번에 변경

### p394, 그림 9-4
- Replication Set 2벌을 만들어서 Rolling-Update 수행
- `kubectl rolling-update` 명령어를 지원

### p402, 하지만,
- rolling-update를 더 이상 사용하지 않는다!
- 원하지 않는 Label이 붙기도 하고...


## Book #3 - Deployment

### p407, --record
- create 하면서 record를 붙이면 이력을 기록한다

### p408, 여러 replica set
- deployment는 버전에 따라 여러개의 replica-set을 만든단다.

### p409, RollingUpdate / Recreate
- deployment에서의 rolling-update는 2가지 전략이 있다. -> RollingUpdate / Recreate
- 다운타임이 절대 없어야 하는 경우 = RpllingUpdate
- 버전 차이가 존재하면 안되는 경우 = Receate

### p410, minReadySeconds
- 최소한 readiness 체크할 시간 이상은 줘야 한다는...???????

### p416, undo
- 되돌아갈 수 있다.

### p418, maxSurge
- p420, 그림 9.12 : 천천히 롤아웃

### p422, pause
- 잠시 멈추기

### p428, 그림 9.14 Readiness
- 시간 관리 잘해라~!!

### p429, Deadline
- 기본 10분 안에 롤아웃이 되어야 한다. 그렇지 않으면 명시적으로 시간 설정하면 된다.


## Extra

### 다양한 전략에 대한 비교/분석/가이드 자료
- https://github.com/ContainerSolutions/k8s-deployment-strategies
  - 각 전략에 따라 필요한 cost에 대해 그래픽으로 잘 보여준다.
  - 비교도 잘 되어있다.
  - Ramped = rollingupdate
  - blue/green and canary = 별도로 만들어줘야 한다 (기본 지원되지 않아서)
- https://medium.com/@domi.stoehr/canary-deployments-on-kubernetes-without-service-mesh-425b7e4cc862
  - ingress의 트래픽 분할 기능을 이용한 전략
