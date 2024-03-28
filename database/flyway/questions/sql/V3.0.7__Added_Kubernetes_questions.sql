insert into categories (department_id, own_id, name, code, time_limit, question_limit, max_question_limit, short_learning, update_date, department_name) values ( currval('lke_departments_id_seq'), nextval('lke_categories_docker_id_seq'), 'Kubernetes', 'D', 0, 0, 0, '1', 1, 'Docker');

insert into questions  (category_id, number, question_val, update_date) values ( currval('lke_categories_docker_id_seq'), '', '1. True or False? In a pod .yaml file, resource limit of cpu: 0.1 is allowed.', '0');
insert into answers    (question_id, answer, correct) values ( currval('questions_id_seq'), 'True.  This can also be written as 100m.', '1');


insert into questions  (category_id, number, question_val, update_date) values ( currval('lke_categories_docker_id_seq'), '', '2. We have the below key:value pairs in a .yaml. How do we give a pod access to the secret via a volume?     metadata.name: user-pid data.pid-password: cUae83JHes=', '0');
insert into answers    (question_id, answer, correct) values ( currval('questions_id_seq'), 'apiVersion: v1
kind: Pod
spec:
    volumes:
 - name: secrets
   secret:
     secretName: user-pid
      volumeMounts:
   - name: secrets
     mountPath: /etc/user-pid', '1');
insert into questions  (category_id, number, question_val, update_date) values ( currval('lke_categories_docker_id_seq'), '', '3. True or False? A secret can be visible to only one container in a pod.', '0');
insert into answers    (question_id, answer, correct) values ( currval('questions_id_seq'), 'True.  This may be done for security reason, such as this example: https://kubernetes.io/docs/concepts/configuration/secret/#use-case-secret-visible-to-one-container-in-a-pod', '1');
insert into questions  (category_id, number, question_val, update_date) values ( currval('lke_categories_docker_id_seq'), '', '4. What are four main types of services?', '0');
insert into answers    (question_id, answer, correct) values ( currval('questions_id_seq'), '-ClusterIP (Expose the service on a cluster-internal IP, not exposed to anything external to Kubernetes cluster)
-NodePort (Expose the service on each Node''s IP at a static port.  External callers can call the service)
-LoadBalancer (Provision an external IP to act as a load balancer for the service.  Exposes a service to external callers)
-ExternalName (Maps a service to a DNS name.  The service doesn''t change IP addresses, but it routes traffic to an external service that does have a dynamic IP)', '1');
insert into questions  (category_id, number, question_val, update_date) values ( currval('lke_categories_docker_id_seq'), '', '5. What kubectl command will give you information such as what node and IP address a pod is on? And any failure events?', '0');
insert into answers    (question_id, answer, correct) values ( currval('questions_id_seq'), 'kubectl describe pod my-nginx', '1');
insert into questions  (category_id, number, question_val, update_date) values ( currval('lke_categories_docker_id_seq'), '', '6. What are some of the benefits of Deployments?', '0');
insert into answers    (question_id, answer, correct) values ( currval('questions_id_seq'), 'Deployments support zero-downtime updates by creating and destroying replica sets and provide rollback functionality', '1');
insert into questions  (category_id, number, question_val, update_date) values ( currval('lke_categories_docker_id_seq'), '', '7. What is the name of the AWS volume type?', '0');
insert into answers    (question_id, answer, correct) values ( currval('questions_id_seq'), 'awsElasticBlockStore', '1');
insert into questions  (category_id, number, question_val, update_date) values ( currval('lke_categories_docker_id_seq'), '', '8. What command will create three pod replicas?', '0');
insert into answers    (question_id, answer, correct) values ( currval('questions_id_seq'), 'kubectl scale deployment my-deployement --replicas=3', '1');
insert into questions  (category_id, number, question_val, update_date) values ( currval('lke_categories_docker_id_seq'), '', '9. What specifies that data in a storage provider should not be erased if a PVC is deleted?', '0');
insert into answers    (question_id, answer, correct) values ( currval('questions_id_seq'), 'persistentVolumeReclaimPolicy: Retain', '1');
insert into questions  (category_id, number, question_val, update_date) values ( currval('lke_categories_docker_id_seq'), '', '10. What does the spec.selector.matchLabels key in a Pod .yaml do?', '0');
insert into answers    (question_id, answer, correct) values ( currval('questions_id_seq'), 'Queries for a template with the specified label in order to use that pod template', '1');
insert into questions  (category_id, number, question_val, update_date) values ( currval('lke_categories_docker_id_seq'), '', '11. What command creates a ConfigMap from an env file?', '0');
insert into answers    (question_id, answer, correct) values ( currval('questions_id_seq'), 'kubectl create configmap [configmap-name] --from-env-file=[path-to-file]', '1');
insert into questions  (category_id, number, question_val, update_date) values ( currval('lke_categories_docker_id_seq'), '', '12. What is a LimitRange?', '0');
insert into answers    (question_id, answer, correct) values ( currval('questions_id_seq'), 'A LimitRange specifies min and max limits on cpu and memory for pods in a namespace. This prevents pods from not being given a limit and consuming too much memory, thus causing other pods to fail on a node.', '1');
insert into questions  (category_id, number, question_val, update_date) values ( currval('lke_categories_docker_id_seq'), '', '13. What access mode allows only one client (i.e. one pod) to write to a PV?', '0');
insert into answers    (question_id, answer, correct) values ( currval('questions_id_seq'), '-ReadWriteOnce', '1');
insert into questions  (category_id, number, question_val, update_date) values ( currval('lke_categories_docker_id_seq'), '', '14. How does Kubernetes accomplish a no downtime deployment?', '0');
insert into answers    (question_id, answer, correct) values ( currval('questions_id_seq'), 'It spins up new pods and routes traffic to them, then subsequently destroys the old pods that no longer have traffic', '1');
insert into questions  (category_id, number, question_val, update_date) values ( currval('lke_categories_docker_id_seq'), '', '15. What command can be used to externally expose a port on a clusterIP service?', '0');
insert into answers    (question_id, answer, correct) values ( currval('questions_id_seq'), 'kubectl port-forward service/[service-name] 8080', '1');
insert into questions  (category_id, number, question_val, update_date) values ( currval('lke_categories_docker_id_seq'), '', '16. What are some zero-downtime deployment options that kubernetes can facilitate?', '0');
insert into answers    (question_id, answer, correct) values ( currval('questions_id_seq'), 'Blue-Green and Canary deployments, among others', '1');
insert into questions  (category_id, number, question_val, update_date) values ( currval('lke_categories_docker_id_seq'), '', '17. If I have the following in a .yaml, how do I access it in a Pod .yaml?kind: PersistentVolumeClaim
apiVersion: v1
metadata:
name: pvc-1', '0');
insert into answers    (question_id, answer, correct) values ( currval('questions_id_seq'), 'spec:
  volumes:
  - name: blob1
    persistentVolumeClaim:
      claimName: pvc-1', '1');
insert into questions  (category_id, number, question_val, update_date) values ( currval('lke_categories_docker_id_seq'), '', '18. What are the two types of Kubernetes probes?', '0');
insert into answers    (question_id, answer, correct) values ( currval('questions_id_seq'), 'Liveness and readiness', '1');
insert into questions  (category_id, number, question_val, update_date) values ( currval('lke_categories_docker_id_seq'), '', '19. What is the annotations.last-applied-configuration.key in a .yaml file?', '0');
insert into answers    (question_id, answer, correct) values ( currval('questions_id_seq'), 'It gives details of the resource''s configurations.  This allows changes to be made to a Pod using kubectl apply', '1');
insert into questions  (category_id, number, question_val, update_date) values ( currval('lke_categories_docker_id_seq'), '', '20. What is a StatefulSet?', '0');
insert into answers    (question_id, answer, correct) values ( currval('questions_id_seq'), 'A StatefulSet manages the deployment and scaling of a set of pods', '1');
insert into questions  (category_id, number, question_val, update_date) values ( currval('lke_categories_docker_id_seq'), '', '21. What happens to a scheduled pod that cannot have its resource requests met by a node?', '0');
insert into answers    (question_id, answer, correct) values ( currval('questions_id_seq'), 'It remains in the PENDING state.', '1');
insert into questions  (category_id, number, question_val, update_date) values ( currval('lke_categories_docker_id_seq'), '', '22. What is a risk of using a hostPath volume?', '0');
insert into answers    (question_id, answer, correct) values ( currval('questions_id_seq'), 'It is dependent on the host.  If the host dies, the data is inaccessible and potentially lost.', '1');
insert into questions  (category_id, number, question_val, update_date) values ( currval('lke_categories_docker_id_seq'), '', '23. What command will show all running pods, replicasets, and deployments?', '0');
insert into answers    (question_id, answer, correct) values ( currval('questions_id_seq'), 'kubectl get all', '1');
insert into questions  (category_id, number, question_val, update_date) values ( currval('lke_categories_docker_id_seq'), '', '24. How are secrets stored on a node?', '0');
insert into answers    (question_id, answer, correct) values ( currval('questions_id_seq'), 'tmpfs', '1');
insert into questions  (category_id, number, question_val, update_date) values ( currval('lke_categories_docker_id_seq'), '', '25. Will ‘kubectl delete pod [pod-name]’ remove and recreate a pod, or just remove?', '0');
insert into answers    (question_id, answer, correct) values ( currval('questions_id_seq'), 'It will remove and recreate if there is an active deployment', '1');
insert into questions  (category_id, number, question_val, update_date) values ( currval('lke_categories_docker_id_seq'), '', '26. True or False? A pod can have multiple volumes attached to it?', '0');
insert into answers    (question_id, answer, correct) values ( currval('questions_id_seq'), 'True', '1');
insert into questions  (category_id, number, question_val, update_date) values ( currval('lke_categories_docker_id_seq'), '', '27. What is gcePersistentDisk fsType?', '0');
insert into answers    (question_id, answer, correct) values ( currval('questions_id_seq'), 'It is the file system type to use for the volume.', '1');
insert into questions  (category_id, number, question_val, update_date) values ( currval('lke_categories_docker_id_seq'), '', '28. What does Secret type:Opaque signify?', '0');
insert into answers    (question_id, answer, correct) values ( currval('questions_id_seq'), 'The secret may contain unstructured data.  There are no constraints on the data.', '1');
insert into questions  (category_id, number, question_val, update_date) values ( currval('lke_categories_docker_id_seq'), '', '29. What field indicates the query by which nodes are selected to create a local storage PV on?', '0');
insert into answers    (question_id, answer, correct) values ( currval('questions_id_seq'), 'nodeAffinity.required.nodeSelectorTerms', '1');
insert into questions  (category_id, number, question_val, update_date) values ( currval('lke_categories_docker_id_seq'), '', '30. What is the name of the Azure volume type?', '0');
insert into answers    (question_id, answer, correct) values ( currval('questions_id_seq'), 'azureFile', '1');
insert into questions  (category_id, number, question_val, update_date) values ( currval('lke_categories_docker_id_seq'), '', '31. What is the difference between a memory request (spec.containers[].resources.requests.memory) and a memory limit (spec.containers[].resources.limits.memory) in a pod .yaml?', '0');
insert into answers    (question_id, answer, correct) values ( currval('questions_id_seq'), 'A pod can use more memory than the memory request amount.  However, if the memory request amount is higher than the available memory on the node, the pod will throw an Out Of Memory error.  A memory limit is the maximum amount of memory that a pod will be allowed to use, even if the node has more available.', '1');
insert into questions  (category_id, number, question_val, update_date) values ( currval('lke_categories_docker_id_seq'), '', '32. If a pod has a memory request of 512MiB and a memory limit of 1 GiB, how many pods of this type could be run on a node with 2 GiB of avaiable memory?', '0');
insert into answers    (question_id, answer, correct) values ( currval('questions_id_seq'), '4.  As the docs say: "A Container is guaranteed to have as much memory as it requests, but is not allowed to use more memory than its limit".  https://kubernetes.io/docs/tasks/configure-pod-container/assign-memory-resource/', '1');
insert into questions  (category_id, number, question_val, update_date) values ( currval('lke_categories_docker_id_seq'), '', '33. What field in a StorageClass .yaml determines what volume plugin is used for creating PVs?', '0');
insert into answers    (question_id, answer, correct) values ( currval('questions_id_seq'), 'provisioner', '1');
insert into questions  (category_id, number, question_val, update_date) values ( currval('lke_categories_docker_id_seq'), '', '34. What command will show you the details of the secret with name: pid-acct?', '0');
insert into answers    (question_id, answer, correct) values ( currval('questions_id_seq'), 'kubectl describe secrets/pid-acct', '1');
insert into questions  (category_id, number, question_val, update_date) values ( currval('lke_categories_docker_id_seq'), '', '35. What kind of volume is useful for sharing transient data between two containers running on a pod?', '0');
insert into answers    (question_id, answer, correct) values ( currval('questions_id_seq'), 'emptyDir.  This directory will be tied to the lifecycle of the pod.', '1');
insert into questions  (category_id, number, question_val, update_date) values ( currval('lke_categories_docker_id_seq'), '', '36. What command will show you the details of all ConfigMaps?', '0');
insert into answers    (question_id, answer, correct) values ( currval('questions_id_seq'), 'kubectl get cm', '1');
insert into questions  (category_id, number, question_val, update_date) values ( currval('lke_categories_docker_id_seq'), '', '37. What does the command ‘kubectl get deployments -l tier=frontend’ do?', '0');
insert into answers    (question_id, answer, correct) values ( currval('questions_id_seq'), 'It lists all deployements with label: tier: frontend', '1');
insert into questions  (category_id, number, question_val, update_date) values ( currval('lke_categories_docker_id_seq'), '', '38. True or False? A ConfigMap can be loaded through a volume?', '0');
insert into answers    (question_id, answer, correct) values ( currval('questions_id_seq'), 'True.  In the pod .yaml file, specify spec.volumes and spec.spec.containers.volumeMounts to point to the appropriate ConfigMap', '1');
insert into questions  (category_id, number, question_val, update_date) values ( currval('lke_categories_docker_id_seq'), '', '39. True or False? Information stored as a Secret is available to pods on all nodes whether the pod requests it or not.', '0');
insert into answers    (question_id, answer, correct) values ( currval('questions_id_seq'), 'False.  The pod has to specifically request the Secret.  This reduces the risk of an attacker getting access to the information contained in a secret.', '1');
insert into questions  (category_id, number, question_val, update_date) values ( currval('lke_categories_docker_id_seq'), '', '40. Which of the following is a cluster-wide storage unit provisioned by an administrator and has a lifecycle independent of pods?', '0');
insert into answers    (question_id, answer, correct) values ( currval('questions_id_seq'), 'PersistentVolume.  (A pod uses a PersistentVolumeClaim to connect to the persistent volume.)', '1');
insert into questions  (category_id, number, question_val, update_date) values ( currval('lke_categories_docker_id_seq'), '', '41. What flag in the yaml file will deny a container the ability to write to a volume?', '0');
insert into answers    (question_id, answer, correct) values ( currval('questions_id_seq'), 'volumeMounts.readOnly: true', '1');
insert into questions  (category_id, number, question_val, update_date) values ( currval('lke_categories_docker_id_seq'), '', '42. What is the difference between port, targetPort, and nodePort keys in a NodePort service .yaml?', '0');
insert into answers    (question_id, answer, correct) values ( currval('questions_id_seq'), 'targetPort is the port the container is running on, port is the port the service is exposed on in the cluster, and nodePort is the port made avaiable to external consumers of the service.', '1');
insert into questions  (category_id, number, question_val, update_date) values ( currval('lke_categories_docker_id_seq'), '', '43. What command will show any limits placed on a deployment?', '0');
insert into answers    (question_id, answer, correct) values ( currval('questions_id_seq'), 'kubectl describe deployment [deployment-name]', '1');
insert into questions  (category_id, number, question_val, update_date) values ( currval('lke_categories_docker_id_seq'), '', '44. What two commands can be used to create a service from file my.service.yml?', '0');
insert into answers    (question_id, answer, correct) values ( currval('questions_id_seq'), 'kubectl apply -f my.service.yml OR kubectl create -f my.service.yml', '1');
insert into questions  (category_id, number, question_val, update_date) values ( currval('lke_categories_docker_id_seq'), '', '45. If I have a ConfigMap .yaml with value metadata.name: db-confg, what value in a pod .yaml will link to this ConfigMap?', '0');
insert into answers    (question_id, answer, correct) values ( currval('questions_id_seq'), 'spec.spec.env[].valueFrom.configMapKeyRef.key: db-confg  OR  spec.spec.env[].envFrom.configMapRef.name: db-confg
The first command is paired with a specific variable name to load one variable.  The second is used to load all variables from a ConfigMap.', '1');
insert into questions  (category_id, number, question_val, update_date) values ( currval('lke_categories_docker_id_seq'), '', '46. What command will show a pod’s .yaml file?', '0');
insert into answers    (question_id, answer, correct) values ( currval('questions_id_seq'), 'kubectl get pod [pod-name] -o yaml', '1');
insert into questions  (category_id, number, question_val, update_date) values ( currval('lke_categories_docker_id_seq'), '', '47. What .yaml key will ensure a pod does NOT get any traffic for X amount of seconds after deployment?', '0');
insert into answers    (question_id, answer, correct) values ( currval('questions_id_seq'), 'minReadySeconds', '1');
insert into questions  (category_id, number, question_val, update_date) values ( currval('lke_categories_docker_id_seq'), '', '48. What command will delete a service created from my.service.yml?', '0');
insert into answers    (question_id, answer, correct) values ( currval('questions_id_seq'), 'kubectl delete -f my.service.yml', '1');
insert into questions  (category_id, number, question_val, update_date) values ( currval('lke_categories_docker_id_seq'), '', '49. What is needed to allow the docker container to use the docker-socket volume in the following .yaml?', '0');
insert into answers    (question_id, answer, correct) values ( currval('questions_id_seq'), 'socket.yaml:
apiVersion: v1
kind: Pod
spec:
volumes:
— name: docker-socket
hostPath:
path: /var/run/docker.socket
type: Socket
containers:
— name: docker
image: docker
command: [“sleep”]
args: [“100000”]', '1');
insert into answers    (question_id, answer, correct) values ( currval('questions_id_seq'), 'volumeMounts:
      - name: docker-socket
        mountPath: /var/run/docker.socket', '1');
insert into questions  (category_id, number, question_val, update_date) values ( currval('lke_categories_docker_id_seq'), '', '50. What is the acceptable naming convention for port names?', '0');
insert into answers    (question_id, answer, correct) values ( currval('questions_id_seq'), 'Port names must only contain lowercase alphanumeric characters and ''-''. Port names must also start and end with an alphanumeric character.', '1');
insert into questions  (category_id, number, question_val, update_date) values ( currval('lke_categories_docker_id_seq'), '', '51. What is a container MountPath?', '0');
insert into answers    (question_id, answer, correct) values ( currval('questions_id_seq'), 'The directory where the volume storage resides.', '1');
insert into questions  (category_id, number, question_val, update_date) values ( currval('lke_categories_docker_id_seq'), '', '52. What entity facilitates dynamic provisioning of Persistent Volumes?', '0');
insert into answers    (question_id, answer, correct) values ( currval('questions_id_seq'), 'Storage Classes.  These can be used to provision Persistent Volumes programatically instead of having an administrator create the PV.', '1');
insert into questions  (category_id, number, question_val, update_date) values ( currval('lke_categories_docker_id_seq'), '', '53. What is the default binding mode for a StorageClass?', '0');
insert into answers    (question_id, answer, correct) values ( currval('questions_id_seq'), 'Immediate.  This means that volume binding and dynamic provisioning occur on creating of the PVC', '1');
insert into questions  (category_id, number, question_val, update_date) values ( currval('lke_categories_docker_id_seq'), '', '54. What command creates a ConfigMap in Kubernetes from a config file?', '0');
insert into answers    (question_id, answer, correct) values ( currval('questions_id_seq'), 'kubectl create configmap [configmap-name] --from-file=[path-to-file]', '1');
insert into questions  (category_id, number, question_val, update_date) values ( currval('lke_categories_docker_id_seq'), '', '55. What flag controls when Kubernetes pulls an image?', '0');
insert into answers    (question_id, answer, correct) values ( currval('questions_id_seq'), 'imagePullPolicy', '1');
