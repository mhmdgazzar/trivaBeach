# Oracle AMD 2 Server Information

## 🖥️ Server Details

- **Instance Name:** `oracle-amd-server-2`
- **IP Address:** `92.5.82.192`
- **Region:** eu-frankfurt-1 (AD-3)
- **OS:** Ubuntu 24.04 LTS (x86_64)
- **Shape:** VM.Standard.E2.1.Micro
- **Specs:** 1/8 OCPU, 1 GB RAM, 480 Mbps Network

## 🔑 SSH Access

**Username:** `ubuntu`

**Private Key Location:**
`/Users/gazzar/Downloads/projects/malteser-web/keys/oracle_server_ssh_key`

**Quick Connect Command:**
```zsh
ssh -i /Users/gazzar/Downloads/projects/malteser-web/keys/oracle_server_ssh_key ubuntu@92.5.82.192
```

**SSH Config Suggestion:**
```ssh
Host oracle-amd-2
    HostName 92.5.82.192
    User ubuntu
    IdentityFile /Users/gazzar/Downloads/projects/malteser-web/keys/oracle_server_ssh_key
```

## 🔄 Active Services

**Automated Provisioning Script:**
The Arm server provisioning script runs 24/7 on this server.

**Check Status:**
```zsh
ssh -t -i /Users/gazzar/Downloads/projects/malteser-web/keys/oracle_server_ssh_key ubuntu@92.5.82.192 "tmux attach -t oracle_provision"
```

**Detach from tmux:**
Press `Ctrl + b` then `d`

---

## 📋 Notes

- Part of Oracle Cloud "Always Free" tier
- Uses the same SSH key as oracle-amd-server-1
- No WireGuard VPN configured on this server (VPN runs on oracle-amd-server-1)
