# GKE
내용이 쉬우니 GKE 실습 내용만 정리

### GCP Kubernetes에 cluster 생성하기
- 생성
```
$ gcloud container clusters create kubia --num-nodes 3 --machine-type g1-small
```
- Node 3개 만들어진 것 확인
```
$ kubectl get nodes
```
- 각 Node에 ssh로 접근할 수도 있다
```
$ gcloud compute ssh gke-kubia-default-pool-adab5992-fg67
```
- Node에 대해서 살펴보기
```
$ kubectl describe node gke-kubia-default-pool-adab5992-fg67
```

### CLI로 Pod 생성하기
- CLI로 Pod 생성하기
```
$ kubectl run kubia --image=suhyuk/kubia --port=8080
```
- Pods 현황 확인하기
```
$ kubectl get pods
```
- YAML 형식으로 보기. JSON으로도 볼 수 있음
```
$ kubectl get pods kubia -o yaml
```

### YAML에서 pods 관련 사용할 수 있는 리소스 설명서
- explain
```
$ kubectl explain pods
```
- YAML에서 pods의 spec 관련 사용할 수 있는 리소스 설명서
```
$ kubectl explain pods.spec
```

### yaml 파일을 이용해서 pods 생성하기
- create
```
$ kubectl create -f kubia-manual.yaml
```
- pod의 log 확인하기
```
$ kubectl logs kubia-manual
```
- pod 안에 들어있는 특정 컨테이너의 log 확인하기
```
$ kubectl logs kubia-manual -c kubia
```

### 포트포워딩
- pod에 직접 접근할 수 있도록 포트포워딩 하기 (GCP 임에도 잘 됨!!!)
```
$ kubectl port-forward kubia-manual 8888:8080
```

### Label
- labels 실습하기 위한 pod 생성
```
$ kubectl create -f kubia-manual-with-labels.yaml
```
- label도 포함해서 pods 정보 보기
```
$ kubectl get pods --show-labels
```
- 특정 label을 열로 정해놓고 pods 정보 보기
```
$ kubectl get pods -L creation_method,env
```


## 대시보드 띄우기
레퍼런스
- https://kubernetes.io/ko/docs/tasks/access-application-cluster/web-ui-dashboard/

### 대시보드 띄우기
```
$ kubectl apply -f https://raw.githubusercontent.com/kubernetes/dashboard/v2.0.0/aio/deploy/recommended.yaml
```

### 인증을 위해서 샘플 사용자 만들기
-참고: https://github.com/kubernetes/dashboard/blob/master/docs/user/access-control/creating-sample-user.md
- 서비스 계정 생성
```
$ cat <<EOF | kubectl apply -f -
apiVersion: v1
kind: ServiceAccount
metadata:
  name: admin-user
  namespace: kubernetes-dashboard
EOF
```
- RBAK
```
$ cat <<EOF | kubectl apply -f -
apiVersion: rbac.authorization.k8s.io/v1
kind: ClusterRoleBinding
metadata:
  name: admin-user
roleRef:
  apiGroup: rbac.authorization.k8s.io
  kind: ClusterRole
  name: cluster-admin
subjects:
- kind: ServiceAccount
  name: admin-user
  namespace: kubernetes-dashboard
EOF
```
- 토큰값 얻어오기
```
$ kubectl -n kubernetes-dashboard describe secret $(kubectl -n kubernetes-dashboard get secret | grep admin-user | awk '{print $1}')
```
- 접근을 위해 proxy
```
$ kubectl proxy
```
- 접속 주소
```
http://localhost:8001/api/v1/namespaces/kubernetes-dashboard/services/https:kubernetes-dashboard:/proxy/
```

## 클러스터 종료
Google에 돈 뜯기지 않기 위해 항상 마무리는 종료

### 목록 보기
```
$ gcloud container clusters list
```
### 종료
```
$ gcloud container clusters delete kubia
```
