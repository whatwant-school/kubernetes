## Endpoint

### 외부 IP 연결
- Endpoint에 그냥 IP 적어놓기만 하면 됨
- 그냥 Proxy Server 처럼 사용할 수 있을 듯

## ExternalName

### 외부 사이트 연결
- 내부 Pod에서 외부 사이트를 연결할 때 DNS 처럼 사용하는 것?!


## NodePort

### 명시적 NodePort
- yaml 파일에 명시적으로 NodePort 번호를 적어주지 않으면, 3만번대 번호가 알아서 설정됨

### GCE 방화벽
- NodePort 지정하고 외부에서 접근을 하려면 방화벽 오픈해줘야 한다
```
$ gcloud compute firewall-rules create tcp-30100 --allow=tcp:30100
```

### NodePort & Pod
- 특정 Node를 통해서 접속을 하더라도 Node에 있는 Proxy를 통해 다른 Node에 있는 Pod에 접속될 수도 있다


## LoadBalancer

### edit
- NodePort로 구성한 Service에 대해서 edit를 통해 type을 **Loadbalancer**로 변경하면 그대로 적용된다.
- 그렇다고 해서 NodePort를 대체하는 것은 아니다. NodePort 앞에 LB가 추가로 생긴다고 봐야한다.

### watch
- 변경된 정보를 확인하기 위해 **-w** 옵션을 붙이면 변경된 정보를 보여준다
```
$ kubectl get svc -w
```

### Remote Addr
- LB를 통해서 Web Pod를 접근하면 Remote IP가 사용자가 아니라 Node의 IP가 보인다?!
- 어떨 때는 Pod 대역의 IP가 보이기도 한다?!
- 이걸 살펴보면 흐름이 보일듯.

### Node 건너 뛰지 않기
- 위의 Remote Addr에 이어서...
- 아래 옵션을 주면 Node를 건너 뛰지 않는다.
```
spec:
  externalTrafficPolicy: Local
```

## Ingress

### Ingress in GCE
- GCE에서 Ingress 사용하려고 하면, GCE 자체적인 HTTP LoadBalancer가 적용됨
- Ingress 적용 후 console에 가보면 LB가 생성되어 있음을 확인할 수 있음

### MetalLB
- Baremetal LB 컨셉의 MetalLB도 있다.
- 공부 필요

### Istio
- 나중에 진행 예정



## Tip

### VSCode
- K8s extension 설치하면
- YAML 파일에서 오른쪽 버튼 메뉴에서 Command Pallet에서 **ktctl create** 선택하면 바로 실행된다

### K8s clear ?!
- 지금 실행중인 것 전부 지워버리고 싶으면
```
$ kubectl delete all --all
```

### ipconfig 웹으로 확인하기
- http://ipconfig.co.kr/
