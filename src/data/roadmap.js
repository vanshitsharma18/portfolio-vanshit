// ═══════════════════════════════════════════════════════
//  Cloud & DevOps Roadmap Data — Vanshit Sharma
//  All progress values are configurable.
//  Status: 'completed' | 'current' | 'planned'
// ═══════════════════════════════════════════════════════

export const PLAYER = {
  name: 'Vanshit',
  role: 'Aspiring Cloud & DevOps Engineer',
  level: 3,
  totalLevels: 5,
  xp: 2800,
  xpMax: 5000,
  achievements: 6,
  // streak is decorative — not a real tracked metric
  streak: 0,
}

export const LEVELS = [
  {
    id: 1,
    num: '01',
    title: 'Foundations',
    theme: 'The Starting Island',
    status: 'completed',
    progress: 100,
    icon: '🏔️',
    color: '#4ADE80',
    glowColor: 'rgba(74,222,128,0.35)',
    description:
      'Build the fundamental knowledge required to understand software development, infrastructure, and the command line.',
    skills: [
      {
        category: 'Linux & Operating Systems',
        items: [
          'Linux filesystem & directory structure',
          'File permissions and ownership',
          'Users, groups, and processes',
          'Package management (apt / yum)',
          'Shell commands and Bash scripting',
          'Environment variables and process management',
        ],
      },
      {
        category: 'Networking Fundamentals',
        items: [
          'IP addresses and subnetting',
          'Public vs. private IP addresses',
          'DNS resolution',
          'HTTP and HTTPS',
          'TCP and UDP',
          'Ports, routing, firewalls, and NAT',
          'Troubleshooting with ping, curl, nslookup',
        ],
      },
      {
        category: 'Git & GitHub',
        items: [
          'Repositories and commits',
          'Branching and merging',
          'Pull requests and code reviews',
          'Merge conflict resolution',
          'Feature branch workflows',
        ],
      },
      {
        category: 'Programming Basics',
        items: [
          'Python and Bash scripting',
          'Variables, conditions, loops, functions',
          'Reading files & environment variables',
          'Basic error handling and automation',
        ],
      },
    ],
    milestones: [
      { text: 'Understand the Linux command line', done: true },
      { text: 'Perform basic network troubleshooting', done: true },
      { text: 'Manage code with Git', done: true },
      { text: 'Write a simple automation script', done: true },
    ],
    currentTasks: [],
    projects: [],
    achievement: { emoji: '🌟', label: 'Foundation Master', earned: true },
  },

  {
    id: 2,
    num: '02',
    title: 'Core DevOps Skills',
    theme: 'The Engineering Island',
    status: 'completed',
    progress: 90,
    icon: '⚙️',
    color: '#7B8EFF',
    glowColor: 'rgba(123,142,255,0.35)',
    description:
      'Learn how applications are built, packaged, configured, and delivered using modern DevOps tools.',
    skills: [
      {
        category: 'Docker & Containers',
        items: [
          'Images and containers',
          'Writing Dockerfiles',
          'Multi-stage builds',
          'Docker Compose',
          'Container networking',
          'Volumes and persistent data',
          'Image optimization and security basics',
        ],
      },
      {
        category: 'CI/CD Fundamentals',
        items: [
          'Continuous integration concepts',
          'Pipeline stages and automation',
          'Build and test automation',
          'Secrets and environment variables',
          'Artifact management',
          'Deployment strategies',
        ],
      },
      {
        category: 'GitHub Actions',
        items: [
          'Workflow YAML files',
          'Triggers and events',
          'Jobs, steps, and runners',
          'Artifacts and caching',
          'Reusable workflows',
          'Environment protection and secrets',
          'OIDC authentication (WIF)',
        ],
      },
      {
        category: 'Infrastructure as Code',
        items: [
          'Terraform configuration language',
          'Providers and resources',
          'Variables and outputs',
          'Modules for reusability',
          'Remote state and state locking',
          'Plan, apply, destroy workflow',
          'Terragrunt for multi-environment management',
        ],
      },
    ],
    milestones: [
      { text: 'Containerize an application with Docker', done: true },
      { text: 'Create a CI pipeline with GitHub Actions', done: true },
      { text: 'Automate a deployment', done: true },
      { text: 'Provision infrastructure with Terraform', done: true },
    ],
    currentTasks: [
      { text: 'Deepen Terragrunt multi-env patterns', done: false },
    ],
    projects: [
      { id: 'p3', label: 'Automated Cloud Deployment Pipeline' },
      { id: 'p2', label: 'Terraform & Terragrunt Infrastructure' },
    ],
    achievement: { emoji: '⚙️', label: 'DevOps Practitioner', earned: true },
  },

  {
    id: 3,
    num: '03',
    title: 'Build Real Projects',
    theme: "The Builder's Island",
    status: 'current',
    progress: 75,
    icon: '🏗️',
    color: '#C8FF00',
    glowColor: 'rgba(200,255,0,0.35)',
    description:
      'Apply the fundamentals to real applications and cloud infrastructure — where theory meets production.',
    skills: [
      {
        category: 'Cloud Deployment (GCP)',
        items: [
          'Cloud Run container deployments',
          'Firestore database integration',
          'Cloud Storage for remote state',
          'Artifact Registry for container images',
          'Workload Identity Federation',
          'IAP and secure access patterns',
          'VPC and subnet configuration',
        ],
      },
      {
        category: 'Cloud Deployment (AWS)',
        items: [
          'AWS Lambda serverless functions',
          'API Gateway configuration',
          'DynamoDB table design',
          'SNS fan-out patterns',
          'S3-hosted frontends',
          'IAM least-privilege policies',
          'CORS configuration',
        ],
      },
      {
        category: 'Production Engineering',
        items: [
          'Environment-separated infrastructure',
          'Application health checks',
          'Container vulnerability scanning (Trivy)',
          'Deployment verification',
          'Architecture documentation',
        ],
      },
    ],
    milestones: [
      { text: 'Deploy a complete GCP application end-to-end', done: true },
      { text: 'Automate the full infrastructure lifecycle', done: true },
      { text: 'Build a working CI/CD pipeline with WIF', done: true },
      { text: 'Document architecture and operational decisions', done: false },
    ],
    currentTasks: [
      { text: 'Complete architecture documentation', done: false },
      { text: 'Add integration tests to CI pipeline', done: false },
      { text: 'Optimize container image sizes', done: false },
    ],
    projects: [
      { id: 'p1', label: 'Cloud Incident Management Platform' },
      { id: 'p2', label: 'Terraform & Terragrunt Infrastructure' },
      { id: 'p3', label: 'Automated Cloud Deployment Pipeline' },
      { id: 'p4', label: 'AWS Serverless Notification Platform' },
    ],
    achievement: { emoji: '🏗️', label: 'Builder Badge', earned: false },
  },

  {
    id: 4,
    num: '04',
    title: 'Advanced Cloud & Platform Eng.',
    theme: 'The Advanced Island',
    status: 'planned',
    progress: 20,
    icon: '🚀',
    color: '#B388FF',
    glowColor: 'rgba(179,136,255,0.35)',
    description:
      'Expand from individual deployments to reliable, scalable, secure infrastructure — the platform engineering layer.',
    skills: [
      {
        category: 'Kubernetes',
        items: [
          'Pods, Deployments, ReplicaSets',
          'Services and Ingress controllers',
          'ConfigMaps and Secrets',
          'Namespaces and RBAC',
          'Resource requests and limits',
          'Liveness, readiness, startup probes',
          'Horizontal Pod Autoscaling',
          'Persistent storage (PVC/PV)',
          'Helm chart packaging',
          'Kubernetes networking & troubleshooting',
        ],
      },
      {
        category: 'GitOps',
        items: [
          'Argo CD fundamentals',
          'Declarative GitOps deployments',
          'Git as the desired-state source',
          'Application synchronization',
          'Drift detection and reconciliation',
          'Rollbacks and environment promotion',
        ],
      },
      {
        category: 'Observability',
        items: [
          'Metrics, logs, and traces (three pillars)',
          'Prometheus metrics collection',
          'Grafana dashboards',
          'Alert rules and SLO/SLI definitions',
          'Incident investigation workflows',
        ],
      },
      {
        category: 'Security & Reliability',
        items: [
          'Container image scanning (Trivy)',
          'Secret management (Vault / GCP Secret Manager)',
          'Dependency scanning in CI',
          'Least-privilege IAM patterns',
          'Backup and recovery strategies',
          'Failure mode analysis',
        ],
      },
    ],
    milestones: [
      { text: 'Deploy application to Kubernetes', done: false },
      { text: 'Configure GitOps-based deployment with ArgoCD', done: false },
      { text: 'Create monitoring dashboards and alerts', done: false },
      { text: 'Apply security and reliability practices end-to-end', done: false },
    ],
    currentTasks: [
      { text: 'Study Kubernetes architecture in depth', done: false },
      { text: 'Set up local k8s cluster with kind/minikube', done: false },
      { text: 'Complete CKA preparation', done: false },
    ],
    projects: [],
    achievement: { emoji: '🚀', label: 'Platform Engineer', earned: false },
  },

  {
    id: 5,
    num: '05',
    title: "What's Next",
    theme: 'The Mastery Castle',
    status: 'planned',
    progress: 0,
    icon: '🏰',
    color: '#FF6B35',
    glowColor: 'rgba(255,107,53,0.35)',
    description:
      'The horizon — continue developing skills to design and operate production-grade cloud platforms at scale.',
    skills: [
      {
        category: 'Platform Engineering',
        items: [
          'Internal developer platforms (IDPs)',
          'Self-service infrastructure with Backstage',
          'Reusable CI/CD templates and golden paths',
          'Advanced Terraform patterns and CDKtf',
          'Policy as Code (OPA / Rego)',
        ],
      },
      {
        category: 'SRE & Reliability',
        items: [
          'SRE principles and error budgets',
          'Incident response playbooks',
          'Distributed systems design patterns',
          'Performance optimization and capacity planning',
          'Chaos engineering',
        ],
      },
      {
        category: 'Cloud Governance',
        items: [
          'Cloud cost governance and FinOps',
          'Multi-cloud architecture patterns',
          'Advanced cloud security posture',
          'Compliance and audit automation',
        ],
      },
      {
        category: 'Community & Growth',
        items: [
          'Open-source contributions',
          'Technical documentation and knowledge sharing',
          'Conference talks and blog posts',
          'Mentoring other engineers',
        ],
      },
    ],
    milestones: [
      { text: 'Build a reusable developer platform', done: false },
      { text: 'Create standardized deployment templates', done: false },
      { text: 'Implement end-to-end observability stack', done: false },
      { text: 'Contribute to open-source cloud tools', done: false },
      { text: 'Design a resilient multi-region architecture', done: false },
    ],
    currentTasks: [],
    projects: [],
    achievement: { emoji: '🏰', label: 'Cloud Architect', earned: false },
  },
]
