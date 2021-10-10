# Angular authorization code

https://kubernetes.io/docs/tasks/configure-pod-container/pull-image-private-registry/
test

kubectl get secret regcred --namespace=default -o yaml | sed 's/namespace: .*/namespace: develop/' | kubectl apply -f -