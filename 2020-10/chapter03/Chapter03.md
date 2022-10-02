# 2주차 : 3장 파드: 쿠버네티스에서 컨테이너 실행

날짜: Oct 24, 2020
진행자: 김경환

# 파드 (Pod)

![Chapter03/Untitled.png](https://github.com/whatwant/Flip-KIA-HandsOn/blob/main/chapter03/Chapter03/Untitled.png)

## 3.1

- 파드는 컨테이넌 그룹이며 쿠버네티스의 기본 빌딩 블록
- 파드가 여러 컨테이너를 가지고 있을 경우에, 모든 컨테이너는 항상 하나의 워커 노드에서 실행되며 여러 워커 노드에 걸쳐 실행되지 않는다. (그림 3.1 참고)

### 3.1.1

- 컨테이너는 단일 프로세스를 실행하는 것을 목적으로 설계되었다. 각 프로세스를 자체의 개별 컨테이너로 실행해야 한다.

### 3.2.2

- 여러 프로세스를 단일 프로세스로 묶지 않기 때문에, 컨테이너를 함께 묶고 하나의 단위로 관리할 수 있는 또 다른 상위 구조가 필요하다. -> 파드!
- 장점
    - 연관된 프로세스를 단일 컨테이너 안에서 함께 실행하는 것처럼 동일한 환경을 제공
    - 같은 파드에서 컨테이너 간 부분 격리
- 파드의 모든 컨테이너는 같은 호스트 네임과 네트워크 인터페이스를 공유한다.
- IPC(Inter-Process Communication)를 통해 서로 통신 가능
- 파일시스템은 컨테이너끼리 완전히 분리된다.
    - 볼륨 개념을 이용해 파일 디렉터리 공유 가능 (6장)
- 컨테이너가 동일한 IP 주소와 포트 공간을 공유한다.
    - 로컬호스트를 통해 서로 통신 할 수 있다.

![Chapter03/Untitled%201.png](https://github.com/whatwant/Flip-KIA-HandsOn/blob/main/chapter03/Chapter03/Untitled%201.png)

- 쿠버네티스 클러스터의 모든 파드는 하나의 플랫한 공유 네트워크 주소 공간에 상주한다.
    - 다른 파드의 IP 주소를 통해 접근 가능

### 3.1.3

- 모든 것을 하나의 파드에 넣는 대신에 어플리케이션을 여러 파드로 구성하고 각 파드에는 밀접하게 관련 있는 프로세스만 포함해야한다.
- 다계층 어플리케이션을 여러 파드로 분할
- 개별 확장이 가능하도록 여러 파드로 분할
    - 하나의 파드에 하나의 컨테이너여야 스케일링에서 이득이 있다.

![Chapter03/Untitled%202.png](https://github.com/whatwant/Flip-KIA-HandsOn/blob/main/chapter03/Chapter03/Untitled%202.png)

- 파드에서 여러 컨테이너를 사용하는 경우는 하나의 주 프로세스와 하나 이상의 보완 프로세스로 구성된 경우이다.

![Chapter03/Untitled%203.png](https://github.com/whatwant/Flip-KIA-HandsOn/blob/main/chapter03/Chapter03/Untitled%203.png)

- 파드에서 여러 컨테이너를 사용 vs 여러 파드로 분리
    - 컨테이너를 함께 실행해야 하는가? 혹은 서로 다른 호스트에서 실행할 수 있는가?
    - 여러 컨테이너가 모여 하나의 구성 요소를 나타내는가? 혹은 개별적인 구성요소인가?
    - 컨테이너가 함께 혹은 개별적으로 스케일링 해야하는가?
- 파드는 동일한 머신에서 실행할 필요가 없다면 여러 컨테이너를 포함하지 말아야 한다.

## 3.2 (실습) YAML 로 파드 생성

### 2장 복습

```bash
# 구글 클라우드 컨테이너 클러스터 생성

bash> gcloud container clusters create kubia --num-nodes 3 --machine-type g1-small

# node 정보 확인

bash> kubectl get nodes

>

NAME STATUS ROLES AGE VERSION

gke-kubia-default-pool-e2d5cfa8-cd29 Ready <none> 6m19s v1.16.13-gke.401

gke-kubia-default-pool-e2d5cfa8-czg4 Ready <none> 6m19s v1.16.13-gke.401

gke-kubia-default-pool-e2d5cfa8-rdlt Ready <none> 6m18s v1.16.13-gke.401

# pod 생성

bash> kubectl run kubia --image=suhyuk/kubia --port=8080

>

pod/kubia created
```

### 파드 정보 확인

```bash
# pod 확인

bashkubectl get pods>

>

NAME READY STATUS RESTARTS AGE

kubia 1/1 Running 0 2m30s

bash> kubectl get po kubia -o yaml

>

apiVersion: v1

kind: Pod

metadata:

annotations:

kubernetes.io/limit-ranger: 'LimitRanger plugin set: cpu request for container

kubia'

creationTimestamp: "2020-10-22T11:49:48Z"

labels:

run: kubia

name: kubia

...
```

### 간단한 YAML 정의 작성

- Chapter3 코드 참조 yaml 파일 참조

### 사용 가능한 API 오브젝트 필드 찾기

```bash
# 파드 오브젝트가 가질수 있는 속성 보기

bash> kubectl explain pods

# 속성 자세히 보기

bash> kubectl explain pod.spec
```

### 파드 만들기

```bash
# 파드 생성

bash> kubectl create -f kubia-manual.yaml

>

pod/kubia-manual created

# pod 확인

bashkubectl get pods

# 파드의 전체 정의보기

bash> kubectl get po kubia-manual -o yaml

bash> kubectl get po kubia-manual -o json
```

### 애플리케이션 로그 보기

```bash
# 파드 로그 가져오기

bash> kubectl logs kubia-manual

>

Kubia server starting...

# 컨테이너 이름 지정

bash> kubectl logs kubia-manual -c kubia
```

### 파드에 요청보내기

- 테스트와 디버깅 목적으로의 연결은 포트 포워딩 사용

```bash
# 포트 포워딩

bash> kubectl port-forward kubia-manual 8888:8080

>

Forwarding from 127.0.0.1:8888 -> 8080

Forwarding from [::1]:8888 -> 8080

# 다른 터미널에서 HTTP 요청

bash> curl localhost:8888
```

![Chapter03/Untitled%204.png](https://github.com/whatwant/Flip-KIA-HandsOn/blob/main/chapter03/Chapter03/Untitled%204.png)

## 3.3 (실습) 레이블을 이용한 파드 구성

- 실제 서비스에서는 매우 많은 파드를 사용하기 때문에 파드를 정리하는 메커니즘이 필요하다.
- 파드를 쉽게 구분할 수 있도록 작은 그룹으로 조직하는 방법이 필요하다. -> **레이블 !**
- 레이블 2개 (app, rel)을 이용한 예시

![Chapter03/Untitled%205.png](https://github.com/whatwant/Flip-KIA-HandsOn/blob/main/chapter03/Chapter03/Untitled%205.png)

### **파드를 생성할 때 레이블 지정**

```bash
# 파드 생성

bash> kubectl create -f kubia-manual-with-labels.yaml

>

pod/kubia-manual-v2 created

# 파드와 레이블 확인

bash> kubectl get po --show-labels

# 특정 레이블만 보기

bash> kubectl get po -L creation_method,env
```

### 기존 파드 레이블 수정

```bash
# 기존 파드에 레이블 추가

bash> kubectl label po kubia-manual creation_method=manual

# 기존 레이블 변경 (--overwrite)

bash> kubectl label po kubia-manual-v2 env=debug --overwrite
```

## 3.4 (실습) 레이블 셀렉터를 이용한 파드 부분 집합 나열

```bash
# 특정 레이블이 있는 파드 나열

bash> kubectl get po -l creation_method=manual

bash> kubectl get po -l env

bash> kubectl get po -l `!env`
```

## 3.5 (실습) 레이블 셀렉터를 이용해 파드 스케줄링 제한

- 파드를 스케줄링을 지정해야할 경우

### 워커 노드 분류에 레이블 사용

- 파드 뿐만 아니라 노드를 포함한 모든 쿠버네티스 오브젝트에 레이블 부착 가능

```bash
$ kubectl get nodes

# 노드에 레이블 부착 (gpu=true)

$ kubectl label node gke-kubia-default-pool-e2d5cfa8-cd29 gpu=true

$ kubectl get nodes -l gpu=true
```

### 특정 노드에 파드 스케줄링

```bash
$ kubectl create -f kubia-gpu.yaml

spec:

nodeSelector:

gpu: "true"
```

## 3.6 (실습) 파드에 어노테이션 달기

- 어노테이션은 키-값 쌍으로 레이블과 비슷하지만 식별 정보를 갖지 않는다.
- 대신 더 많은 정보를 보유할 수 있다.
- 주로 도구들 사이에서 사용

### 어노테이션 추가 및 수정

```bash
# 파드에 어노테이션 추가

$ kubectl annotate pod kubia-manual mycompany.com/someannotation="foo bar"

# 확인

$ kubectl describe pod kubia-manual
```

## 3.7 (실습) 네임스페이스를 사용한 리소스 그룹화

- 오브젝트를 겹치지 안흔 그룹으로 분할할 때 사용
- 멀티테넌트 환경처럼 리소스를 분리하는 데 사용

### 네임스페이스 보기

```bash
$ kubectl get ns

# 네임스페이스에 속해있는 파드 나열

$ kubectl get po --namespace kube-system
```

### yaml 파일에서 네임스페이스 생성

```bash
$ kubectl create -f custom-namespace.yaml

$ kubectl create namespace custom-namespace
```

### 파드 생성 시 네임스페이스 지정

```bash
$ kubectl create -f kubia-manual.yaml -n custom-namespace
```

## 3.8 (실습) 파드의 중지와 제거

```bash
# 이름으로 파드 삭제

$ kubectl delete po kubia-gpu

# 레이블 셀렉터를 이용한 파드 삭제

$ kubectl delete po -l creation_method=manual

# 네임스페이스 삭제

$ kubectl delete ns custom-namespace

# 현재 네임스페이스에 있는 파드 모두 삭제

$ kubectl delete po --all

# 현재 네임스페이스에서 (거의) 모든 리소스 삭제

$ kubectl delete all --all
```

## 클라우드 종료

```bash
# cluster 확인
$ gcloud container clusters list

# 종료
$ gcloud container clusters delete kubia
```
