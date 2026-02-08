#!/usr/bin/env bash

kubectl create namespace monitoring-ns-local
kubectl config set-context --current --namespace=monitoring-ns-local



# kubectl apply -f monitoring.yaml


# sleep 15

# kubectl apply -f d3s-ro-cluster.yaml
# kubectl apply -f d3s-ro-svc.yaml



kubectl get all