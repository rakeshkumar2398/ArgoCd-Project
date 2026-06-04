# Complete DevOps & GitOps Setup Guide

## 1. Update Server

```bash
sudo yum update -y
```

---

## 2. Install Java 21

```bash
sudo dnf install java-21-amazon-corretto -y
java -version
```

---

## 3. Install Jenkins

```bash
sudo wget -O /etc/yum.repos.d/jenkins.repo https://pkg.jenkins.io/redhat-stable/jenkins.repo

sudo rpm --import https://pkg.jenkins.io/redhat-stable/jenkins.io-2023.key

sudo yum install jenkins -y

sudo systemctl enable jenkins

sudo systemctl start jenkins

sudo systemctl status jenkins
```

Get Jenkins Password:

```bash
sudo cat /var/lib/jenkins/secrets/initialAdminPassword
```

---

## 4. Install Docker

```bash
sudo yum install docker -y

sudo systemctl enable docker

sudo systemctl start docker

sudo usermod -aG docker jenkins

sudo chmod 666 /var/run/docker.sock

sudo systemctl restart jenkins

docker --version
```

---

## 5. Install Git and Maven

```bash
sudo yum install git maven -y

git --version

mvn -version
```

---

## 6. Install Trivy

```bash
sudo tee /etc/yum.repos.d/trivy.repo <<EOF
[trivy]
name=Trivy repository
baseurl=https://aquasecurity.github.io/trivy-repo/rpm/releases/$basearch/
gpgcheck=0
enabled=1
EOF
```

```bash
sudo yum install trivy -y

trivy --version
```

---

## 7. Install SonarQube

```bash
docker run -d \
--name sonarqube \
-p 9000:9000 \
sonarqube:community
```

Check:

```bash
docker ps
```

Open:

```text
http://<EC2-PUBLIC-IP>:9000
```

Login:

```text
admin
admin
```

---

## 8. Install kubectl

```bash
curl -LO "https://dl.k8s.io/release/$(curl -L -s https://dl.k8s.io/release/stable.txt)/bin/linux/amd64/kubectl"

chmod +x kubectl

sudo mv kubectl /usr/local/bin/

kubectl version --client
```

---

## 9. Install eksctl

```bash
curl --silent --location "https://github.com/eksctl-io/eksctl/releases/latest/download/eksctl_$(uname -s)_amd64.tar.gz" | tar xz -C /tmp

sudo mv /tmp/eksctl /usr/local/bin

eksctl version
```

---

## 10. Configure AWS CLI

```bash
aws --version

aws configure
```

---

## 11. Create EKS Cluster

```bash
eksctl create cluster \
--name chaicafe-cluster \
--region us-east-1 \
--nodegroup-name workers \
--node-type t3.medium \
--nodes 2
```

Check:

```bash
kubectl get nodes
```

---

## 12. Install ArgoCD

```bash
kubectl create namespace argocd
```

```bash
kubectl apply -n argocd -f https://raw.githubusercontent.com/argoproj/argo-cd/stable/manifests/install.yaml
```

```bash
kubectl get pods -n argocd
```

Expose ArgoCD:

```bash
kubectl patch svc argocd-server -n argocd -p '{"spec": {"type": "LoadBalancer"}}'
```

```bash
kubectl get svc -n argocd
```

Get ArgoCD Password:

```bash
kubectl -n argocd get secret argocd-initial-admin-secret -o jsonpath="{.data.password}" | base64 -d; echo
```

---

## 13. Jenkins Credentials

Create these credentials inside Jenkins:

```text
dockerhub
github
sonar
```

---

## 14. Final CI/CD Flow

```text
GitHub
   ↓
Jenkins
   ↓
SonarQube
   ↓
Docker Build
   ↓
Trivy Scan
   ↓
DockerHub
   ↓
ArgoCD
   ↓
EKS Deployment
```
