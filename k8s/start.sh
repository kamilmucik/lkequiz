#!/usr/bin/env bash

kubectl create namespace lkequiz-local
kubectl config set-context --current --namespace=lkequiz-local

kubectl get pod  --namespace=lkequiz-local
kubectl get pods -o=name --field-selector=status.phase=Running


kubectl apply -f auth-db-pvc.yaml
kubectl apply -f auth-db-config.yaml
kubectl apply -f auth-db-secret.yaml
kubectl apply -f auth-db-statefulset.yaml
kubectl apply -f auth-db-svc.yaml

kubectl apply -f question-db-pvc.yaml
kubectl apply -f question-db-config.yaml
kubectl apply -f question-db-secret.yaml
kubectl apply -f question-db-statefulset.yaml
kubectl apply -f question-db-svc.yaml

sleep 15

kubectl apply -f auth-svc-config.yaml
kubectl apply -f auth-svc-deployment.yaml
kubectl apply -f auth-svc-svc.yaml

kubectl apply -f question-svc-config.yaml
kubectl apply -f question-svc-deployment.yaml
kubectl apply -f question-svc-svc.yaml
