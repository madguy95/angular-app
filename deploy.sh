echo 'remove old'
kubectl delete -f spa-service.yaml
kubectl delete -f spa-deployment.yaml

echo 'add new'
kubectl apply -f spa-deployment.yaml
kubectl apply -f spa-service.yaml