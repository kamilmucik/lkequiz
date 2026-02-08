#!/usr/bin/env bash

kubectl create namespace monitoring-ns-local
kubectl config set-context --current --namespace=monitoring-ns-local



# kubectl apply -f monitoring.yaml


# sleep 15

kubectl apply -f monitoring.yaml
# kubectl apply -f service.yaml



kubectl get all


# http://loki-svc.monitoring-ns-local.svc.cluster.local:3100
# http://prometheus-svc.monitoring-ns-local.svc.cluster.local:9090