// 지점별 데이터를 일관성 있게 생성하는 유틸리티 함수들

// 문자열을 숫자 해시로 변환
export const stringToHash = (str: string): number => {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash; // Convert to 32bit integer
  }
  return Math.abs(hash);
};

// 지점별 고유 시드 생성
export const getBranchSeed = (agency: string, branch: string): number => {
  return stringToHash(`${agency}-${branch}`);
};

// 시드 기반 랜덤 값 생성 (0~1 사이)
export const seededRandom = (seed: number, offset: number = 0): number => {
  const x = Math.sin(seed + offset) * 10000;
  return x - Math.floor(x);
};

// 지점별 APE 실적 생성 (Agent360Dashboard와 동일한 로직)
export const generateBranchPerformance = (agency: string, branch: string): {
  currentMonthAPE: number;
  previousMonthAPE: number;
  achievement: number;
} => {
  const seed = getBranchSeed(agency, branch);
  const random1 = seededRandom(seed, 1);
  const random2 = seededRandom(seed, 2);

  // 지점 순위 시뮬레이션 (해시 기반)
  const rankIndex = seed % 160;

  let currentMonthAPE = 0;
  let previousMonthAPE = 0;

  // 상위 10개: 큰 실적 (650만~2000만)
  if (rankIndex < 10) {
    currentMonthAPE = 6500000 + Math.floor(13500000 * random1);
    previousMonthAPE = 6500000 + Math.floor(13500000 * random2);
  }
  // 다음 20개: 중상위 실적 (320만~650만)
  else if (rankIndex < 30) {
    currentMonthAPE = 3200000 + Math.floor(3300000 * random1);
    previousMonthAPE = 3200000 + Math.floor(3300000 * random2);
  }
  // 다음 30개: 중간 실적 (120만~330만)
  else if (rankIndex < 60) {
    currentMonthAPE = 1200000 + Math.floor(2100000 * random1);
    previousMonthAPE = 1200000 + Math.floor(2100000 * random2);
  }
  // 다음 70개: 작은 실적 (25만~120만)
  else if (rankIndex < 130) {
    currentMonthAPE = 250000 + Math.floor(950000 * random1);
    previousMonthAPE = 250000 + Math.floor(950000 * random2);
  }
  // 나머지: 매우 작거나 0인 실적
  else {
    if (random1 < 0.5) {
      currentMonthAPE = 0;
    } else {
      currentMonthAPE = 50000 + Math.floor(200000 * random1);
    }
    if (random2 < 0.5) {
      previousMonthAPE = 0;
    } else {
      previousMonthAPE = 50000 + Math.floor(200000 * random2);
    }
  }

  // 10만원 단위로 반올림
  currentMonthAPE = Math.round(currentMonthAPE / 100000) * 100000;
  previousMonthAPE = Math.round(previousMonthAPE / 100000) * 100000;

  // 목표는 전월 실적의 80~120%
  const targetAPE = previousMonthAPE > 0
    ? Math.round(previousMonthAPE * (0.8 + random1 * 0.4) / 100000) * 100000
    : currentMonthAPE > 0
      ? Math.round(currentMonthAPE * (1.2 + random1 * 0.3) / 100000) * 100000
      : 2000000; // 기본 목표 200만원

  const achievement = targetAPE > 0 ? Math.round((currentMonthAPE / targetAPE) * 1000) / 10 : 0;

  return {
    currentMonthAPE,
    previousMonthAPE,
    achievement
  };
};

// 지점별 설계사 수 생성
export const generateAgentCount = (agency: string, branch: string): {
  total: number;
  active: number;
} => {
  const seed = getBranchSeed(agency, branch);
  const random1 = seededRandom(seed, 10);

  // 위촉설계사는 20~200 사이
  const total = 20 + Math.floor(random1 * 181);

  // 실적 데이터 가져오기
  const performance = generateBranchPerformance(agency, branch);
  const hasPerformance = performance.currentMonthAPE > 500000;

  let active = 0;
  if (hasPerformance) {
    // 위촉설계사의 20~40% 정도가 가동
    active = Math.floor(total * 0.2) + Math.floor(random1 * total * 0.2);
    active = Math.min(active, total);

    // 일부는 가동설계사가 0인 경우도 있음
    if (seed % 15 === 0) active = 0;
  }

  return { total, active };
};

// 지점별 지점장 이름 생성
export const generateManagerName = (agency: string, branch: string): string => {
  const lastNames = ['김', '이', '박', '최', '정', '강', '조', '윤', '장', '임'];
  const firstNames = ['영수', '민지', '서연', '준호', '지우', '하준', '서현', '도윤', '수빈', '예준'];

  const seed = getBranchSeed(agency, branch);
  const lastNameIndex = seed % lastNames.length;
  const firstNameIndex = (seed * 7) % firstNames.length;

  return lastNames[lastNameIndex] + firstNames[firstNameIndex];
};

// 지점별 주소 생성
export const generateBranchAddress = (agency: string, branch: string): string => {
  const cities = ['서울', '부산', '대구', '인천', '광주', '대전', '울산', '경기'];
  const districts = ['강남구', '서초구', '송파구', '강동구', '해운대구', '중구', '남구', '북구'];
  const streets = ['테헤란로', '강남대로', '논현로', '선릉로', '역삼로', '언주로', '봉은사로'];

  const seed = getBranchSeed(agency, branch);
  const cityIndex = seed % cities.length;
  const districtIndex = (seed * 3) % districts.length;
  const streetIndex = (seed * 5) % streets.length;
  const buildingNumber = 10 + (seed % 990);

  return `${cities[cityIndex]} ${districts[districtIndex]} ${streets[streetIndex]} ${buildingNumber}`;
};

// 지점별 전화번호 생성
export const generateBranchPhone = (agency: string, branch: string): string => {
  const seed = getBranchSeed(agency, branch);
  const areaCode = ['02', '031', '032', '051', '053'][seed % 5];
  const middle = String(100 + (seed % 900)).padStart(3, '0');
  const last = String(1000 + (seed * 7 % 9000)).padStart(4, '0');

  return `${areaCode}-${middle}-${last}`;
};
