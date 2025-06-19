# EFK Stack

Elasticsearch, Fluentd, Kibana (EFK) 스택을 Docker Compose로 구성한 프로젝트입니다.

## 사전 요구사항

- Docker Desktop 또는 Docker Engine
- Docker Compose (Docker Desktop에 포함되어 있음)

## 빠른 시작

### 1. 프로젝트 클론 및 이동
```bash
git clone <repository-url>
cd efk-stack
```

### 2. Elasticsearch 컨테이너 실행
```bash
# 백그라운드에서 실행
docker compose up -d

# 또는 로그와 함께 실행 (디버깅용)
docker compose up
```

### 3. 컨테이너 상태 확인
```bash
# 실행 중인 컨테이너 확인
docker compose ps

# 컨테이너 로그 확인
docker compose logs elasticsearch
```

## 테스트 방법

### 1. Elasticsearch 연결 테스트
```bash
# 기본 헬스체크
curl -u elastic:changeme http://localhost:9200/_cluster/health

# 인덱스 목록 확인
curl -u elastic:changeme http://localhost:9200/_cat/indices?v
```

### 2. 브라우저에서 확인
- Elasticsearch: http://localhost:9200
- 사용자명: `elastic`
- 비밀번호: `changeme`

### 3. 테스트 인덱스 생성
```bash
# 테스트 문서 생성
curl -X POST "localhost:9200/test-index/_doc" \
  -H "Content-Type: application/json" \
  -u elastic:changeme \
  -d '{
    "message": "Hello Elasticsearch!",
    "timestamp": "'$(date -u +%Y-%m-%dT%H:%M:%S.%3NZ)'"
  }'

# 생성된 문서 조회
curl -u elastic:changeme http://localhost:9200/test-index/_search
```

## 관리 명령어

### 컨테이너 관리
```bash
# 컨테이너 중지
docker compose down

# 컨테이너 중지 및 볼륨 삭제
docker compose down -v

# 컨테이너 재시작
docker compose restart

# 컨테이너 재빌드
docker compose up --build
```

### 로그 관리
```bash
# 실시간 로그 확인
docker compose logs -f elasticsearch

# 특정 서비스의 로그 확인
docker compose logs elasticsearch
```

### 데이터 관리
```bash
# 데이터 백업
docker exec es-single-node tar czf - /usr/share/elasticsearch/data > backup.tar.gz

# 데이터 복원
docker exec -i es-single-node tar xzf - < backup.tar.gz
```

## 문제 해결

### 일반적인 문제들

1. **포트 충돌**
   ```bash
   # 사용 중인 포트 확인
   lsof -i :9200
   lsof -i :9300
   ```

2. **메모리 부족**
   ```bash
   # Docker 메모리 제한 확인
   docker stats
   ```

3. **권한 문제**
   ```bash
   # 데이터 디렉토리 권한 수정
   sudo chown -R 1000:1000 ./data/es-data
   ```

### 로그 확인
```bash
# Elasticsearch 로그
docker compose logs elasticsearch

# 시스템 리소스 사용량
docker stats es-single-node
```

## 구성 정보

- **Elasticsearch 버전**: 9.0.2
- **포트**: 9200 (HTTP), 9300 (Transport)
- **클러스터**: 단일 노드
- **보안**: 기본 인증 활성화
- **데이터 저장**: `./data/es-data`

## 다음 단계

- [ ] Fluentd 추가
- [ ] Kibana 추가
- [ ] 로그 수집 파이프라인 구성
- [ ] 모니터링 대시보드 설정

## 라이선스

이 프로젝트는 MIT 라이선스 하에 배포됩니다.
