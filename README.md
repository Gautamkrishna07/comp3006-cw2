# COMP3006 CW2

[![wakatime](https://wakatime.com/badge/user/55c30436-1509-4eb9-9f18-fa9b7c6060c4/project/ce940c15-9f6e-4391-a3b5-7944cb53a10b.svg)](https://wakatime.com/@coreyrichardson/projects/fiosdeicoz?start=2025-12-28&end=2026-01-09)
[![Continuous Integration Workflow](https://github.com/Plymouth-University/coursework-corey-richardson/actions/workflows/ci.yaml/badge.svg)](https://github.com/Plymouth-University/coursework-corey-richardson/actions/workflows/ci.yaml)

A full-stack, real-time social networking platform built with the MERN stack and Socket.io.

- Real-Time Synchronisation: Live feed updates, likes, and comment counts using WebSockets.
- Contextual Feed Logic: Intelligent state management (Global vs. Following vs. Profile) via React Context and Reducers.
- Atomic Transactions: Data integrity using MongoDB Replica Sets for complex delete operations.
- Containerized Architecture: Fully orchestrated using Docker for environment parity.

![MongoDB](https://img.shields.io/badge/MongoDB-%234ea94b.svg?style=for-the-badge&logo=mongodb&logoColor=white)
![Express.js](https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB)
![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white)

![Docker](https://img.shields.io/badge/docker-%230db7ed.svg?style=for-the-badge&logo=docker&logoColor=white)
![GitHub Actions](https://img.shields.io/badge/github%20actions-%232671E5.svg?style=for-the-badge&logo=githubactions&logoColor=white)
![ESLint](https://img.shields.io/badge/ESLint-4B3263?style=for-the-badge&logo=eslint&logoColor=white) 
![Husky](https://img.shields.io/badge/Husky-7E57C2?style=for-the-badge&logo=husky&logoColor=white)

![Vitest](https://img.shields.io/badge/-Vitest-252529?style=for-the-badge&logo=vitest&logoColor=FCC72B)
![Supertest](https://img.shields.io/badge/Supertest-000000?style=for-the-badge&logoColor=white)

![Socket.io](https://img.shields.io/badge/Socket.io-black?style=for-the-badge&logo=socket.io&badgeColor=010101)
![JWT](https://img.shields.io/badge/JWT-black?style=for-the-badge&logo=JSON%20web%20tokens)
![Bcrypt](https://img.shields.io/badge/Bcrypt-575757?style=for-the-badge&logo=biometric&logoColor=white)

## How to Run Locally

Prerequisites:
- Docker Desktop
- Node.js (v18+)

```sh
git clone https://github.com/corey-richardson/comp3006-cw2.git
cd SourceCode

docker-compose up -d
# or
./up.sh
```

## Documentation

### Design

Low-fidelity wireframes and architecture diagrams are located in the [diagrams](/03-diagrams/) folder.

### Report

See the [submission report](/04-report/Report.pdf) for the full MoSCoW requirement analysis and technical evaluation.
