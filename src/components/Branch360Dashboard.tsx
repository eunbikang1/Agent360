import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Building, Users, Phone, MapPin, Calendar, TrendingUp, ChevronDown, User, ArrowDown, Download, Briefcase } from 'lucide-react';

const Branch360Dashboard = () => {
  const { agency, branchName } = useParams<{ agency?: string; branchName: string }>();
  const navigate = useNavigate();

  // 실제 대리점/지점 데이터 (Agent360Dashboard와 동일)
  const agencies = ['지금용코리아', '글로벌금융판매', '메타리치', '지에이스타금융서비스', '더블유에셋', '한국지에이금융서비스', '메가'];
  const branchNames = ['서울', '대원', '그레이트탑', '사랑', '케이엘아이케이베스트', '글로벌화이브스타', '화이브스타성화', '하나돔', '하나돔강북', '리더스에프엔', '리더스에이치비', '리더스마이보험체크', '리더스일산', '리더스마이보험', '이센트럴마포', '케이에스에프에스동대문', '케이에스에프에스군자', '케이엘아이은평', '케이엘아이운정', '지금용', '케이에스드래곤슬', '케이에스드래곤행신', '수도디아이씨', '글로벌인슈몽산', '글로벌인슈고양', '글로벌인슈에이치', '브릿지재무설계', '인스라이트서클강북', '굿브즈스카이', '인슈에셋자오선', '보험스토어', '골드자산관리센터', '리치골드', '부천코어', '일산센터', '1인지에이 일산2센터', '서울지사', '기업금융본부', '일산지사', '인슈에셋고양'];

  // 대리점별 지점 매핑 생성
  const generateBranchesForAgency = (agency: string) => {
    const agencyIndex = agencies.indexOf(agency);
    const branchesPerAgency = Math.floor(160 / agencies.length) + (agencyIndex < 160 % agencies.length ? 1 : 0);
    const branches = [];
    const suffixes = ['', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];

    for (let i = 0; i < branchesPerAgency; i++) {
      const baseBranch = branchNames[i % branchNames.length];
      const suffix = suffixes[Math.floor(i / branchNames.length)];
      branches.push(baseBranch + suffix);
    }
    return branches;
  };

  // URL에서 받은 파라미터를 기본값으로 설정
  const displayedAgency = agency ? decodeURIComponent(agency) : agencies[0];
  const displayedBranch = branchName ? decodeURIComponent(branchName) : generateBranchesForAgency(displayedAgency)[0];

  const [selectedAgency, setSelectedAgency] = useState(displayedAgency);
  const [selectedBranch, setSelectedBranch] = useState(displayedBranch);
  const [showAgencyDropdown, setShowAgencyDropdown] = useState(false);
  const [showBranchDropdown, setShowBranchDropdown] = useState(false);

  // 선택된 대리점의 지점 목록
  const availableBranches = generateBranchesForAgency(selectedAgency);

  // 대리점 변경 시 첫 번째 지점으로 자동 설정
  const handleAgencyChange = (agency: string) => {
    setSelectedAgency(agency);
    const newBranches = generateBranchesForAgency(agency);
    setSelectedBranch(newBranches[0]);
    setShowAgencyDropdown(false);
    // URL 업데이트
    navigate(`/branch/${encodeURIComponent(agency)}/${encodeURIComponent(newBranches[0])}`);
  };

  // 지점 변경
  const handleBranchChange = (branch: string) => {
    setSelectedBranch(branch);
    setShowBranchDropdown(false);
    // URL 업데이트
    navigate(`/branch/${encodeURIComponent(selectedAgency)}/${encodeURIComponent(branch)}`);
  };

  // 지능형 단위 포매팅 함수
  const formatCurrency = (amount: number) => {
    if (amount >= 100000000) { // 1억 원 이상
      const billions = amount / 100000000;
      return billions % 1 === 0 ? `${billions.toFixed(0)} 억` : `${billions.toFixed(1)} 억`;
    } else if (amount >= 10000) { // 1만 원 이상
      const tenThousands = amount / 10000;
      return tenThousands % 1 === 0 ? `${tenThousands.toLocaleString()} 만원` : `${tenThousands.toFixed(1)} 만원`;
    } else {
      return `${amount.toLocaleString()} 원`;
    }
  };


  // 핵심 성과 지표 (전일 마감 기준)
  const corePerformance = {
    // 목표 달성률 (APE 기준)
    achievementRate: 60.0, // 900/1500
    currentApe: 9000, // 만원 단위 (9억)
    targetApe: 15000, // 만원 단위 (15억)
    achievementVsLastMonth: 8.5, // 전월 동기 대비 %p
    
    // 지점장 실적 기여도
    managerContributionRate: 29.0, // 역삼지점 실적(0.9억) ÷ 지점장 전체 실적(3.1억)
    managerApe: 31000, // 지점장 개인 실적 (만원) 3.1억
    managerName: '김영수', // 지점장 이름
    managerPersonalTarget: 50000, // 지점장 개인 목표 (만원) 5억
    branchTargetApe: 15000, // 역삼지점 목표 APE (만원) 1.5억
    managerPlanContribution: 30.0, // 역삼지점 목표(1.5억) ÷ 지점장 목표(5억)
    managerContribVsLastMonth: -2.3, // 전월 동기 대비 %p
    totalBranchApe: 9000, // 역삼지점 실적 APE (만원) 0.9억
    
    // 월누적 APE
    monthlyApeAmount: 9000, // 만원
    apeGrowthAmount: 4200, // 전월 동기 대비 증가분 (만원)
    apeGrowthPercent: 15.3, // 전월 동기 대비 %
    apeDailyAverage: Math.round(9000/15), // 일평균 APE (만원)
    
    // 월누적 설계
    proposalCount: 162,
    proposalGrowth: 12, // 전월 동기 대비
    proposalDailyAverage: Math.round(162/15),
    
    // 월누적 청약
    contractCount: 95,
    contractGrowth: -5, // 전월 동기 대비
    contractDailyAverage: Math.round(95/15)
  };

  // 일별 실적 데이터 (건강/종신 비중 포함)
  const dailyPerformance = [
    { day: 1, apeAmount: 32, contractCount: 4, isWeekend: false, healthRatio: 70, lifeRatio: 30 },
    { day: 2, apeAmount: 48, contractCount: 3, isWeekend: false, healthRatio: 65, lifeRatio: 35 },
    { day: 3, apeAmount: 29, contractCount: 2, isWeekend: false, healthRatio: 75, lifeRatio: 25 },
    { day: 4, apeAmount: 55, contractCount: 5, isWeekend: false, healthRatio: 60, lifeRatio: 40 },
    { day: 5, apeAmount: 41, contractCount: 4, isWeekend: false, healthRatio: 68, lifeRatio: 32 },
    { day: 6, apeAmount: 0, contractCount: 0, isWeekend: true, healthRatio: 0, lifeRatio: 0 },
    { day: 7, apeAmount: 0, contractCount: 0, isWeekend: true, healthRatio: 0, lifeRatio: 0 },
    { day: 8, apeAmount: 38, contractCount: 3, isWeekend: false, healthRatio: 72, lifeRatio: 28 },
    { day: 9, apeAmount: 62, contractCount: 6, isWeekend: false, healthRatio: 55, lifeRatio: 45 },
    { day: 10, apeAmount: 44, contractCount: 4, isWeekend: false, healthRatio: 80, lifeRatio: 20 },
    { day: 11, apeAmount: 51, contractCount: 5, isWeekend: false, healthRatio: 58, lifeRatio: 42 },
    { day: 12, apeAmount: 36, contractCount: 3, isWeekend: false, healthRatio: 73, lifeRatio: 27 },
    { day: 13, apeAmount: 0, contractCount: 0, isWeekend: true, healthRatio: 0, lifeRatio: 0 },
    { day: 14, apeAmount: 0, contractCount: 0, isWeekend: true, healthRatio: 0, lifeRatio: 0 },
    { day: 15, apeAmount: 47, contractCount: 4, isWeekend: false, healthRatio: 64, lifeRatio: 36 },
    { day: 16, apeAmount: 33, contractCount: 3, isWeekend: false, healthRatio: 69, lifeRatio: 31 },
    { day: 17, apeAmount: 58, contractCount: 5, isWeekend: false, healthRatio: 67, lifeRatio: 33 },
    { day: 18, apeAmount: 42, contractCount: 4, isWeekend: false, healthRatio: 71, lifeRatio: 29 },
    { day: 19, apeAmount: 39, contractCount: 3, isWeekend: false, healthRatio: 76, lifeRatio: 24 }
  ];


  // 상태 변수들
  const [hoveredMonthData, setHoveredMonthData] = useState<any>(null);
  const [hoveredDayData, setHoveredDayData] = useState<any>(null);
  const [selectedYear, setSelectedYear] = useState<string>('2025');
  const [selectedMetric, setSelectedMetric] = useState<string>('월 APE');
  const [selectedProduct, setSelectedProduct] = useState<'전체' | '건강' | '종신/정기'>('건강');
  const [productSortBy, setProductSortBy] = useState<'amount' | 'count'>('amount');
  const [dailyMetric, setDailyMetric] = useState<'일 APE' | '청약 건수'>('일 APE'); // 일별 차트 지표
  const [hoveredAverage, setHoveredAverage] = useState<{type: 'daily' | 'monthly', value: number} | null>(null); // 평균선 호버
  const [showExpectedProgressTooltip, setShowExpectedProgressTooltip] = useState(false); // 기대진도 툴팁

  // 관리 활동 이력 (최근 5개월, 마지막 활동일 포함)
  const managementHistory = [
    {
      month: '9월',
      education: { count: 1, lastDate: '9/5', daysAgo: 8 },
      visit: { count: 0, lastDate: '8/28', daysAgo: 16 },
      appPush: { count: 15, lastDate: '9/12', daysAgo: 1 },
      sms: { count: 20, lastDate: '9/11', daysAgo: 2 }
    },
    { 
      month: '8월', 
      education: { count: 3, lastDate: '8/25', daysAgo: 19 },
      visit: { count: 4, lastDate: '8/30', daysAgo: 14 },
      appPush: { count: 28, lastDate: '8/31', daysAgo: 13 },
      sms: { count: 35, lastDate: '8/29', daysAgo: 15 }
    },
    { 
      month: '7월', 
      education: { count: 1, lastDate: '7/15', daysAgo: 60 },
      visit: { count: 2, lastDate: '7/22', daysAgo: 53 },
      appPush: { count: 22, lastDate: '7/31', daysAgo: 44 },
      sms: { count: 28, lastDate: '7/28', daysAgo: 47 }
    },
    { 
      month: '6월', 
      education: { count: 2, lastDate: '6/20', daysAgo: 85 },
      visit: { count: 3, lastDate: '6/28', daysAgo: 77 },
      appPush: { count: 20, lastDate: '6/30', daysAgo: 75 },
      sms: { count: 30, lastDate: '6/29', daysAgo: 76 }
    },
    { 
      month: '5월', 
      education: { count: 4, lastDate: '5/25', daysAgo: 111 },
      visit: { count: 1, lastDate: '5/10', daysAgo: 126 },
      appPush: { count: 18, lastDate: '5/31', daysAgo: 106 },
      sms: { count: 25, lastDate: '5/30', daysAgo: 107 }
    }
  ];

  // 설계사 현황 - 당월 가동 현황
  const [selectedAgentCategory, setSelectedAgentCategory] = useState<string | null>(null);
  const [agentListModal, setAgentListModal] = useState(false);
  const [selectedAgent] = useState<any>(null);
  const [agentDetailModal, setAgentDetailModal] = useState(false);
  const [agentSortBy, setAgentSortBy] = useState('mmp');
  const [agentSortOrder, setAgentSortOrder] = useState<'desc' | 'asc'>('desc');
  const [showAllAgentsModal, setShowAllAgentsModal] = useState(false);
  const [agentPeriod, setAgentPeriod] = useState<'current' | 'previous'>('current');
  
  const currentAgentStatus = {
    total: 47, // 총 소속 설계사
    active: 35, // 당월 가동 설계사
    newThisMonth: 2, // 당월 신규 위촉 (새로 입사한 설계사)
    resignedThisMonth: 1, // 당월 해촉
    netChange: 1, // 순증감 (신규위촉2 - 해촉1)
    continuous6Months: 12, // 6개월 연속 가동
    continuous3Months: 8, // 3개월 연속 가동
    continuous2Months: 5, // 2개월 연속 가동
    newActive: 4, // 당월 신규 가동 (처음 실적 낸 설계사)
    previousActiveNowInactive: 4 // 가동이었는데 지금 무실적
  };


  // 에이전트 리스트 데이터
  const baseAgentLists = {
    continuous6Months: [
      '이지은', '김선호', '김준영', '이하늘', '박상호', '정미선', '조영수', '차서영', '손민준', '박지수', '정동현', '차민정'
    ],
    continuous3Months: [
      '김영희', '이수진', '박지영', '정예린', '조은경', '손지원', '김동현', '이민지'
    ],
    continuous2Months: [
      '박형준', '김나영', '이성민', '정주영', '조민석'
    ],
    newActive: [
      '최지후', '김대우', '이예진', '박시원' // 당월 신규 가동 (처음 실적 낸 설계사)
    ],
    newCommissioned: [
      '정민준', '조상원' // 당월 신규 위촉 (새로 입사한 설계사)
    ],
    previousActiveNowInactive: [
      '김영수', '이동희', '박승현', '정대영'
    ],
    inactive: [
      '김스우', '이지인', '박성민', '정선영', '조지우', '차예린', '손이상', '김은영', '이승찬', '박서우', '정민규', '조예림'
    ]
  };

  // 전체 47명 설계사 데이터 생성 (완전 고정 데이터)
  const generateAllAgentsData = () => {
    return [
      // TOP 5 우수 설계사
      {
        name: '이지은', agentCode: 'AG001',
        currentMonth: { premium: 208, contracts: 13, rank: 1 },
        previousMonth: { premium: 186, contracts: 11, rank: 2 },
        threeMonthAverage: { premium: 195, contracts: 12 },
        productMix: { health: 70, life: 30 }, isActive: true
      },
      {
        name: '김선호', agentCode: 'AG002',
        currentMonth: { premium: 186, contracts: 12, rank: 2 },
        previousMonth: { premium: 192, contracts: 13, rank: 1 },
        threeMonthAverage: { premium: 189, contracts: 12 },
        productMix: { health: 55, life: 45 }, isActive: true
      },
      {
        name: '김준영', agentCode: 'AG003',
        currentMonth: { premium: 172, contracts: 11, rank: 3 },
        previousMonth: { premium: 164, contracts: 10, rank: 3 },
        threeMonthAverage: { premium: 168, contracts: 10 },
        productMix: { health: 65, life: 35 }, isActive: true
      },
      {
        name: '이하늘', agentCode: 'AG004',
        currentMonth: { premium: 158, contracts: 9, rank: 4 },
        previousMonth: { premium: 152, contracts: 8, rank: 4 },
        threeMonthAverage: { premium: 155, contracts: 8 },
        productMix: { health: 40, life: 60 }, isActive: true
      },
      {
        name: '박상호', agentCode: 'AG005',
        currentMonth: { premium: 145, contracts: 10, rank: 5 },
        previousMonth: { premium: 139, contracts: 9, rank: 5 },
        threeMonthAverage: { premium: 142, contracts: 9 },
        productMix: { health: 80, life: 20 }, isActive: true
      },

      // 6-12위: 연속 가동 설계사
      {
        name: '정미선', agentCode: 'AG006',
        currentMonth: { premium: 132, contracts: 8, rank: 6 },
        previousMonth: { premium: 125, contracts: 7, rank: 6 },
        threeMonthAverage: { premium: 128, contracts: 7 },
        productMix: { health: 55, life: 45 }, isActive: true
      },
      {
        name: '조영수', agentCode: 'AG007',
        currentMonth: { premium: 118, contracts: 7, rank: 7 },
        previousMonth: { premium: 114, contracts: 6, rank: 7 },
        threeMonthAverage: { premium: 116, contracts: 6 },
        productMix: { health: 75, life: 25 }, isActive: true
      },
      {
        name: '차서영', agentCode: 'AG008',
        currentMonth: { premium: 105, contracts: 6, rank: 8 },
        previousMonth: { premium: 98, contracts: 5, rank: 8 },
        threeMonthAverage: { premium: 101, contracts: 5 },
        productMix: { health: 60, life: 40 }, isActive: true
      },
      {
        name: '손민준', agentCode: 'AG009',
        currentMonth: { premium: 92, contracts: 5, rank: 9 },
        previousMonth: { premium: 87, contracts: 4, rank: 9 },
        threeMonthAverage: { premium: 89, contracts: 4 },
        productMix: { health: 45, life: 55 }, isActive: true
      },
      {
        name: '박지수', agentCode: 'AG010',
        currentMonth: { premium: 84, contracts: 4, rank: 10 },
        previousMonth: { premium: 79, contracts: 3, rank: 10 },
        threeMonthAverage: { premium: 81, contracts: 3 },
        productMix: { health: 85, life: 15 }, isActive: true
      },
      {
        name: '정동현', agentCode: 'AG011',
        currentMonth: { premium: 76, contracts: 3, rank: 11 },
        previousMonth: { premium: 72, contracts: 2, rank: 11 },
        threeMonthAverage: { premium: 74, contracts: 2 },
        productMix: { health: 50, life: 50 }, isActive: true
      },
      {
        name: '차민정', agentCode: 'AG012',
        currentMonth: { premium: 68, contracts: 2, rank: 12 },
        previousMonth: { premium: 65, contracts: 2, rank: 12 },
        threeMonthAverage: { premium: 66, contracts: 2 },
        productMix: { health: 70, life: 30 }, isActive: true
      },

      // 13-20위: 연속 가동 설계사 (3개월)
      {
        name: '김영희', agentCode: 'AG013',
        currentMonth: { premium: 61, contracts: 2, rank: 13 },
        previousMonth: { premium: 58, contracts: 1, rank: 13 },
        threeMonthAverage: { premium: 59, contracts: 1 },
        productMix: { health: 65, life: 35 }, isActive: true
      },
      {
        name: '이수진', agentCode: 'AG014',
        currentMonth: { premium: 54, contracts: 1, rank: 14 },
        previousMonth: { premium: 52, contracts: 1, rank: 14 },
        threeMonthAverage: { premium: 53, contracts: 1 },
        productMix: { health: 55, life: 45 }, isActive: true
      },
      {
        name: '박지영', agentCode: 'AG015',
        currentMonth: { premium: 48, contracts: 1, rank: 15 },
        previousMonth: { premium: 45, contracts: 1, rank: 15 },
        threeMonthAverage: { premium: 46, contracts: 1 },
        productMix: { health: 80, life: 20 }, isActive: true
      },
      {
        name: '정예린', agentCode: 'AG016',
        currentMonth: { premium: 42, contracts: 1, rank: 16 },
        previousMonth: { premium: 39, contracts: 1, rank: 16 },
        threeMonthAverage: { premium: 40, contracts: 1 },
        productMix: { health: 40, life: 60 }, isActive: true
      },
      {
        name: '조은경', agentCode: 'AG017',
        currentMonth: { premium: 36, contracts: 1, rank: 17 },
        previousMonth: { premium: 34, contracts: 1, rank: 17 },
        threeMonthAverage: { premium: 35, contracts: 1 },
        productMix: { health: 75, life: 25 }, isActive: true
      },
      {
        name: '손지원', agentCode: 'AG018',
        currentMonth: { premium: 31, contracts: 1, rank: 18 },
        previousMonth: { premium: 28, contracts: 1, rank: 18 },
        threeMonthAverage: { premium: 29, contracts: 1 },
        productMix: { health: 60, life: 40 }, isActive: true
      },
      {
        name: '김동현', agentCode: 'AG019',
        currentMonth: { premium: 26, contracts: 1, rank: 19 },
        previousMonth: { premium: 24, contracts: 1, rank: 19 },
        threeMonthAverage: { premium: 25, contracts: 1 },
        productMix: { health: 50, life: 50 }, isActive: true
      },
      {
        name: '이민지', agentCode: 'AG020',
        currentMonth: { premium: 22, contracts: 1, rank: 20 },
        previousMonth: { premium: 20, contracts: 1, rank: 20 },
        threeMonthAverage: { premium: 21, contracts: 1 },
        productMix: { health: 85, life: 15 }, isActive: true
      },

      // 21-25위: 연속 가동 설계사 (2개월)
      {
        name: '박형준', agentCode: 'AG021',
        currentMonth: { premium: 18, contracts: 1, rank: 21 },
        previousMonth: { premium: 16, contracts: 1, rank: 21 },
        threeMonthAverage: { premium: 17, contracts: 1 },
        productMix: { health: 45, life: 55 }, isActive: true
      },
      {
        name: '김나영', agentCode: 'AG022',
        currentMonth: { premium: 15, contracts: 1, rank: 22 },
        previousMonth: { premium: 13, contracts: 1, rank: 22 },
        threeMonthAverage: { premium: 14, contracts: 1 },
        productMix: { health: 70, life: 30 }, isActive: true
      },
      {
        name: '이성민', agentCode: 'AG023',
        currentMonth: { premium: 12, contracts: 1, rank: 23 },
        previousMonth: { premium: 10, contracts: 1, rank: 23 },
        threeMonthAverage: { premium: 11, contracts: 1 },
        productMix: { health: 55, life: 45 }, isActive: true
      },
      {
        name: '정주영', agentCode: 'AG024',
        currentMonth: { premium: 9, contracts: 1, rank: 24 },
        previousMonth: { premium: 8, contracts: 1, rank: 24 },
        threeMonthAverage: { premium: 8, contracts: 1 },
        productMix: { health: 80, life: 20 }, isActive: true
      },
      {
        name: '조민석', agentCode: 'AG025',
        currentMonth: { premium: 7, contracts: 1, rank: 25 },
        previousMonth: { premium: 6, contracts: 1, rank: 25 },
        threeMonthAverage: { premium: 6, contracts: 1 },
        productMix: { health: 65, life: 35 }, isActive: true
      },

      // 26-29위: 신규 가동 (당월 처음 실적)
      {
        name: '최지후', agentCode: 'AG026',
        currentMonth: { premium: 5, contracts: 1, rank: 26 },
        previousMonth: { premium: 0, contracts: 0, rank: null },
        threeMonthAverage: { premium: 2, contracts: 0 },
        productMix: { health: 40, life: 60 }, isActive: true
      },
      {
        name: '김대우', agentCode: 'AG027',
        currentMonth: { premium: 4, contracts: 1, rank: 27 },
        previousMonth: { premium: 0, contracts: 0, rank: null },
        threeMonthAverage: { premium: 2, contracts: 0 },
        productMix: { health: 75, life: 25 }, isActive: true
      },
      {
        name: '이예진', agentCode: 'AG028',
        currentMonth: { premium: 3, contracts: 1, rank: 28 },
        previousMonth: { premium: 0, contracts: 0, rank: null },
        threeMonthAverage: { premium: 1, contracts: 0 },
        productMix: { health: 60, life: 40 }, isActive: true
      },
      {
        name: '박시원', agentCode: 'AG029',
        currentMonth: { premium: 2, contracts: 1, rank: 29 },
        previousMonth: { premium: 0, contracts: 0, rank: null },
        threeMonthAverage: { premium: 1, contracts: 0 },
        productMix: { health: 50, life: 50 }, isActive: true
      },

      // 30-31위: 신규 위촉 (당월 입사, 실적 있음)
      {
        name: '정민준', agentCode: 'AG030',
        currentMonth: { premium: 1, contracts: 1, rank: 30 },
        previousMonth: { premium: 0, contracts: 0, rank: null },
        threeMonthAverage: { premium: 0, contracts: 0 },
        productMix: { health: 85, life: 15 }, isActive: true
      },
      {
        name: '조상원', agentCode: 'AG031',
        currentMonth: { premium: 1, contracts: 1, rank: 31 },
        previousMonth: { premium: 0, contracts: 0, rank: null },
        threeMonthAverage: { premium: 0, contracts: 0 },
        productMix: { health: 45, life: 55 }, isActive: true
      },

      // 32-35위: 전월 가동 → 무실적
      {
        name: '윤서연', agentCode: 'AG032',
        currentMonth: { premium: 0, contracts: 0, rank: null },
        previousMonth: { premium: 45, contracts: 2, rank: 15 },
        threeMonthAverage: { premium: 22, contracts: 1 },
        productMix: { health: 70, life: 30 }, isActive: false
      },
      {
        name: '장민호', agentCode: 'AG033',
        currentMonth: { premium: 0, contracts: 0, rank: null },
        previousMonth: { premium: 38, contracts: 2, rank: 18 },
        threeMonthAverage: { premium: 19, contracts: 1 },
        productMix: { health: 55, life: 45 }, isActive: false
      },
      {
        name: '강예슬', agentCode: 'AG034',
        currentMonth: { premium: 0, contracts: 0, rank: null },
        previousMonth: { premium: 32, contracts: 1, rank: 20 },
        threeMonthAverage: { premium: 16, contracts: 0 },
        productMix: { health: 80, life: 20 }, isActive: false
      },
      {
        name: '오준혁', agentCode: 'AG035',
        currentMonth: { premium: 0, contracts: 0, rank: null },
        previousMonth: { premium: 28, contracts: 1, rank: 22 },
        threeMonthAverage: { premium: 14, contracts: 0 },
        productMix: { health: 40, life: 60 }, isActive: false
      },

      // 36-47위: 미가동 설계사
      { name: '김스우', agentCode: 'AG036', currentMonth: { premium: 0, contracts: 0, rank: null }, previousMonth: { premium: 0, contracts: 0, rank: null }, threeMonthAverage: { premium: 0, contracts: 0 }, productMix: { health: 75, life: 25 }, isActive: false },
      { name: '이지인', agentCode: 'AG037', currentMonth: { premium: 0, contracts: 0, rank: null }, previousMonth: { premium: 0, contracts: 0, rank: null }, threeMonthAverage: { premium: 0, contracts: 0 }, productMix: { health: 60, life: 40 }, isActive: false },
      { name: '박성민', agentCode: 'AG038', currentMonth: { premium: 0, contracts: 0, rank: null }, previousMonth: { premium: 0, contracts: 0, rank: null }, threeMonthAverage: { premium: 0, contracts: 0 }, productMix: { health: 50, life: 50 }, isActive: false },
      { name: '정선영', agentCode: 'AG039', currentMonth: { premium: 0, contracts: 0, rank: null }, previousMonth: { premium: 0, contracts: 0, rank: null }, threeMonthAverage: { premium: 0, contracts: 0 }, productMix: { health: 85, life: 15 }, isActive: false },
      { name: '조지우', agentCode: 'AG040', currentMonth: { premium: 0, contracts: 0, rank: null }, previousMonth: { premium: 0, contracts: 0, rank: null }, threeMonthAverage: { premium: 0, contracts: 0 }, productMix: { health: 45, life: 55 }, isActive: false },
      { name: '차예린', agentCode: 'AG041', currentMonth: { premium: 0, contracts: 0, rank: null }, previousMonth: { premium: 0, contracts: 0, rank: null }, threeMonthAverage: { premium: 0, contracts: 0 }, productMix: { health: 70, life: 30 }, isActive: false },
      { name: '손이상', agentCode: 'AG042', currentMonth: { premium: 0, contracts: 0, rank: null }, previousMonth: { premium: 0, contracts: 0, rank: null }, threeMonthAverage: { premium: 0, contracts: 0 }, productMix: { health: 55, life: 45 }, isActive: false },
      { name: '김은영', agentCode: 'AG043', currentMonth: { premium: 0, contracts: 0, rank: null }, previousMonth: { premium: 0, contracts: 0, rank: null }, threeMonthAverage: { premium: 0, contracts: 0 }, productMix: { health: 80, life: 20 }, isActive: false },
      { name: '이승찬', agentCode: 'AG044', currentMonth: { premium: 0, contracts: 0, rank: null }, previousMonth: { premium: 0, contracts: 0, rank: null }, threeMonthAverage: { premium: 0, contracts: 0 }, productMix: { health: 40, life: 60 }, isActive: false },
      { name: '박서우', agentCode: 'AG045', currentMonth: { premium: 0, contracts: 0, rank: null }, previousMonth: { premium: 0, contracts: 0, rank: null }, threeMonthAverage: { premium: 0, contracts: 0 }, productMix: { health: 75, life: 25 }, isActive: false },
      { name: '정민규', agentCode: 'AG046', currentMonth: { premium: 0, contracts: 0, rank: null }, previousMonth: { premium: 0, contracts: 0, rank: null }, threeMonthAverage: { premium: 0, contracts: 0 }, productMix: { health: 60, life: 40 }, isActive: false },
      { name: '조예림', agentCode: 'AG047', currentMonth: { premium: 0, contracts: 0, rank: null }, previousMonth: { premium: 0, contracts: 0, rank: null }, threeMonthAverage: { premium: 0, contracts: 0 }, productMix: { health: 50, life: 50 }, isActive: false }
    ];
  };

  const allAgentsData = generateAllAgentsData();

  // TOP 5 설계사는 allAgentsData에서 상위 5명을 가져옴
  const topAgents = allAgentsData.slice(0, 5);

  // 설계사 정렬 함수
  const getSortedAgents = (useAllData = false) => {
    const agentList = useAllData ? allAgentsData : topAgents;
    
    const sorted = [...agentList].sort((a, b) => {
      let aValue, bValue;
      
      // TOP5 표시용에서는 agentPeriod에 따라 정렬
      if (!useAllData) {
        if (agentPeriod === 'current') {
          aValue = a.currentMonth.premium;
          bValue = b.currentMonth.premium;
        } else if (agentPeriod === 'previous') {
          aValue = a.previousMonth.premium;
          bValue = b.previousMonth.premium;
        }
        return bValue - aValue; // 내림차순
      }
      
      // 전체 리스트에서는 기존 정렬 방식 사용
      switch (agentSortBy) {
        case 'mmp':
          // 미가동 설계사는 0으로 처리
          aValue = a.isActive ? a.currentMonth.premium : 0;
          bValue = b.isActive ? b.currentMonth.premium : 0;
          break;
        case 'prevMmp':
          aValue = a.previousMonth.premium;
          bValue = b.previousMonth.premium;
          break;
        case 'prevContracts':
          aValue = a.previousMonth.contracts;
          bValue = b.previousMonth.contracts;
          break;
        case 'contracts':
          // 미가동 설계사는 0으로 처리
          aValue = a.isActive ? a.currentMonth.contracts : 0;
          bValue = b.isActive ? b.currentMonth.contracts : 0;
          break;
        case 'healthRatio':
          aValue = a.productMix.health;
          bValue = b.productMix.health;
          break;
        default:
          aValue = a.isActive ? a.currentMonth.premium : 0;
          bValue = b.isActive ? b.currentMonth.premium : 0;
      }
      
      if (agentSortOrder === 'desc') {
        return bValue - aValue;
      } else {
        return aValue - bValue;
      }
    });
    
    // TOP5는 5개만 반환
    return useAllData ? sorted : sorted.slice(0, 5);
  };
  
  const allAgentsList: string[] = [
    ...baseAgentLists.continuous6Months,
    ...baseAgentLists.continuous3Months,
    ...baseAgentLists.continuous2Months,
    ...baseAgentLists.newActive,
    ...baseAgentLists.newCommissioned,
    '김상훈', '이지연', '박수진', '정민서', '조혜진', '차예진', '손원준', '김동규',
    '이선미', '박재훈', '정수경', '조민준', '차성훈', '손지후', '김예린', '이대하'
  ];

  const getAgentList = (category: string): string[] => {
    if (category === 'allAgents') {
      return allAgentsList;
    }
    
    return baseAgentLists[category as keyof typeof baseAgentLists] || [];
  };
  
  const handleCategoryClick = (category: string) => {
    setSelectedAgentCategory(category);
    setAgentListModal(true);
  };


  // Top 3 상품 목록 가져오기
  const getTopProducts = () => {
    const productData = {
      '전체': {
        byAmount: [
          { rank: 1, name: 'THE건강해지는종신보험(기본형)', amount: '42.5억', count: '285건' },
          { rank: 2, name: '암치료비걱정없는암보험(갱신형)', amount: '28.3억', count: '412건' },
          { rank: 3, name: 'THE건강해지는건강정기보험', amount: '21.7억', count: '198건' }
        ],
        byCount: [
          { rank: 1, name: '암치료비걱정없는암보험(갱신형)', amount: '28.3억', count: '412건' },
          { rank: 2, name: 'THE건강해지는종신보험(기본형)', amount: '42.5억', count: '285건' },
          { rank: 3, name: 'THE건강한치아보험V(갱신형)', amount: '15.2억', count: '256건' }
        ]
      },
      '건강': {
        byAmount: [
          { rank: 1, name: '암치료비걱정없는암보험(갱신형)', amount: '28.3억', count: '412건' },
          { rank: 2, name: 'THE건강한치아보험V(갱신형)', amount: '18.5억', count: '198건' },
          { rank: 3, name: '골라담간편건강보험Ⅱ(갱신형)', amount: '12.7억', count: '156건' }
        ],
        byCount: [
          { rank: 1, name: '암치료비걱정없는암보험(갱신형)', amount: '28.3억', count: '412건' },
          { rank: 2, name: 'THE건강한치아보험V(갱신형)', amount: '18.5억', count: '198건' },
          { rank: 3, name: '선심속치매보험(해약환급금미지급형)', amount: '8.2억', count: '186건' }
        ]
      },
      '종신/정기': {
        byAmount: [
          { rank: 1, name: 'THE건강해지는종신보험(기본형)', amount: '42.5억', count: '285건' },
          { rank: 2, name: 'THE건강해지는건강정기보험', amount: '21.7억', count: '198건' },
          { rank: 3, name: 'THE채우는종신보험(해약환급금일부지급형)', amount: '15.8억', count: '142건' }
        ],
        byCount: [
          { rank: 1, name: 'THE건강해지는종신보험(기본형)', amount: '42.5억', count: '285건' },
          { rank: 2, name: 'THE간편고지종신보험(해약환급금미지급형)', amount: '12.3억', count: '215건' },
          { rank: 3, name: 'THE건강해지는건강정기보험', amount: '21.7억', count: '198건' }
        ]
      }
    };

    return (productData as any)[selectedProduct][productSortBy === 'amount' ? 'byAmount' : 'byCount'];
  };
  
  const handleShowAllAgents = () => {
    setSelectedAgentCategory('allAgents');
    setAgentListModal(true);
  };




  // 지점 특성
  const branchProfile = {
    partnershipDate: '2022.10.24',
    partnershipMonths: 23,
    designerAvgAge: 42.3,
    designerAvgCareer: 5.2,
    customerAvgAge: 45.2,
    averagePremium: 768, // 월 평균 보험료 (만원)
    premiumRange: 'mid-high', // 중고액 위주
    mainProducts: {
      health: 65,
      life: 35
    },
    salesProcess: {
      monthlyProposal: 162,
      monthlyApplication: 104, 
      monthlyContract: 95,
      conversionRate: 64.2, // 설계→청약 전환율
      contractRate: 91.3, // 청약→체결률
      rejectionRate: 8.7 // 인수거절률
    },
    address: '서울특별시 강남구 테헤란로 123 역삼빌딩 5층',
    phone: '02-1234-5678'
  };

  // 고객/계약 특성 데이터 (이번달 vs 3개월 평균)
  const metricsData = {
    current: {
      customerAge: '30-40대',
      customerGender: '여성 55%',
      averagePremium: '4.8만원',
      mainProduct: '건강보험 72%',
      avgApeAmount: '850만원',
      avgContractCount: '12건'
    },
    average: {
      customerAge: '30-40대',
      customerGender: '여성 52%',
      averagePremium: '4.2만원',
      mainProduct: '건강보험 65%',
      avgApeAmount: '780만원',
      avgContractCount: '11건'
    }
  };


  const handleExcelDownload = () => {
    alert('엑셀 다운로드 기능이 실행됩니다.');
  };

  return (
    <>
      <div className="min-h-screen bg-gray-50 flex flex-col">

      {/* Header */}
      <div className="bg-white border-b px-6 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-6">
            <h1 className="text-xl font-bold text-gray-900">지점 360° 상세 뷰</h1>

            <div className="flex items-center space-x-3">
              <div className="relative">
                <button
                  onClick={() => setShowAgencyDropdown(!showAgencyDropdown)}
                  className="flex items-center space-x-2 px-4 py-2 bg-gray-50 hover:bg-gray-100 rounded-lg border"
                >
                  <span className="text-sm text-gray-600">대리점:</span>
                  <span className="text-sm font-medium">{selectedAgency}</span>
                  <ChevronDown className="w-4 h-4 text-gray-500" />
                </button>
                {showAgencyDropdown && (
                  <div className="absolute top-full left-0 mt-1 w-64 bg-white border border-gray-200 rounded-lg shadow-lg z-50 max-h-60 overflow-y-auto">
                    {agencies.map((agency) => (
                      <button
                        key={agency}
                        onClick={() => handleAgencyChange(agency)}
                        className={`w-full px-4 py-2 text-left text-sm hover:bg-gray-50 ${
                          agency === selectedAgency ? 'bg-blue-50 text-blue-700 font-medium' : 'text-gray-700'
                        }`}
                      >
                        {agency}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              <div className="relative">
                <button
                  onClick={() => setShowBranchDropdown(!showBranchDropdown)}
                  className="flex items-center space-x-2 px-4 py-2 bg-blue-50 hover:bg-blue-100 rounded-lg border border-blue-200"
                >
                  <span className="text-sm text-blue-600">지점:</span>
                  <span className="text-sm font-bold text-blue-700">{selectedBranch}</span>
                  <ChevronDown className="w-4 h-4 text-blue-600" />
                </button>
                {showBranchDropdown && (
                  <div className="absolute top-full left-0 mt-1 w-64 bg-white border border-gray-200 rounded-lg shadow-lg z-50 max-h-60 overflow-y-auto">
                    {availableBranches.map((branch) => (
                      <button
                        key={branch}
                        onClick={() => handleBranchChange(branch)}
                        className={`w-full px-4 py-2 text-left text-sm hover:bg-gray-50 ${
                          branch === selectedBranch ? 'bg-blue-50 text-blue-700 font-medium' : 'text-gray-700'
                        }`}
                      >
                        {branch}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              <p className="text-xs text-gray-500">2025.09.20(금) - 9/19 마감 데이터 반영 | 9월 영업일: 15일/22일 (잔여 7일)</p>
            </div>
          </div>
          
          <button
            onClick={handleExcelDownload}
            className="px-3 py-1.5 bg-green-600 hover:bg-green-700 text-white text-sm font-medium rounded flex items-center space-x-2"
          >
            <Download className="w-4 h-4" />
            <span>원클릭 엑셀 다운로드</span>
          </button>
        </div>

        {/* 드롭다운 외부 클릭 시 닫기 */}
        {(showAgencyDropdown || showBranchDropdown) && (
          <div
            className="fixed inset-0 z-40"
            onClick={() => {
              setShowAgencyDropdown(false);
              setShowBranchDropdown(false);
            }}
          />
        )}
      </div>

      {/* Main Content - 3단 구조 */}
      <div className="flex-1 p-6 overflow-y-auto">
        <div className="grid grid-cols-3 gap-6">
          
          {/* 왼쪽: 핵심 성과 지표 */}
          <div className="space-y-4">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-bold text-gray-900 flex items-center">
                <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center mr-3">
                  <TrendingUp className="w-5 h-5 text-blue-600" />
                </div>
                당월 실적 현황
              </h2>
              <span className="text-sm text-gray-500">9월 기준</span>
            </div>

            {/* APE 실적 현황 - 심플 버전 */}
            <div className="bg-white rounded-lg shadow-sm border p-6">
              <h3 className="text-base font-bold text-gray-800 mb-4 border-b border-gray-100 pb-2">목표달성률 (APE 기준)</h3>

              <div className="text-center mb-4">
                <div className="text-5xl font-black text-blue-600 mb-2">{corePerformance.achievementRate.toFixed(1)}%</div>
                <div className="text-lg text-gray-600 font-medium mb-4">
                  {formatCurrency(corePerformance.currentApe * 10000)} / {formatCurrency(corePerformance.targetApe * 10000)}
                </div>

                <div className="w-full bg-gray-200 rounded-full h-5 mb-2 relative">
                  <div className="bg-blue-500 h-5 rounded-full transition-all" style={{width: `${corePerformance.achievementRate}%`}}></div>
                  {/* 기대 진도선 (15일/22일 = 68.2%) */}
                  <div
                    className="absolute top-0 h-5 w-0.5 bg-orange-500 z-10 cursor-pointer"
                    style={{left: `${(15/22)*100}%`}}
                    onMouseEnter={() => setShowExpectedProgressTooltip(true)}
                    onMouseLeave={() => setShowExpectedProgressTooltip(false)}
                  />
                  {/* 기대 진도 호버 영역 확대 */}
                  <div
                    className="absolute top-0 h-5 w-4 z-10 cursor-pointer"
                    style={{left: `${(15/22)*100}%`, transform: 'translateX(-50%)'}}
                    onMouseEnter={() => setShowExpectedProgressTooltip(true)}
                    onMouseLeave={() => setShowExpectedProgressTooltip(false)}
                  />
                  {/* 기대 진도 툴팁 */}
                  {showExpectedProgressTooltip && (
                    <div
                      className="absolute top-6 bg-gray-800 text-white text-xs rounded px-3 py-2 whitespace-nowrap z-20 shadow-lg"
                      style={{left: `${(15/22)*100}%`, transform: 'translateX(-50%)'}}
                    >
                      <div className="font-bold mb-1">기대진도 {Math.round((15/22)*100)}%</div>
                      <div className="text-gray-300">영업일 기준: 15일/22일</div>
                    </div>
                  )}
                </div>

                <div className="mb-4 h-4"></div>
              </div>

              <div className="grid grid-cols-2 gap-3 mb-4">
                <div className="text-left">
                  <div className="text-xs text-gray-500 mb-1">전월 동기 대비</div>
                  <div className={`font-semibold text-lg ${corePerformance.achievementVsLastMonth > 0 ? 'text-green-600' : 'text-red-600'}`}>
                    {corePerformance.achievementVsLastMonth > 0 ? '▲ ' : '▼ '}{Math.abs(corePerformance.achievementVsLastMonth)}%p
                  </div>
                  <div className={`text-xs ${corePerformance.achievementVsLastMonth > 0 ? 'text-green-600' : 'text-red-600'}`}>
                    {corePerformance.achievementVsLastMonth > 0 ? '+' : ''}{formatCurrency((corePerformance.currentApe * corePerformance.achievementVsLastMonth / 100) * 10000)}
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-xs text-gray-500 mb-1">목표까지</div>
                  <div className="font-semibold text-lg text-gray-900">{formatCurrency(Math.abs(corePerformance.targetApe - corePerformance.currentApe) * 10000)}</div>
                  <div className="text-xs text-gray-500">
                    {corePerformance.currentApe >= corePerformance.targetApe ? '목표 달성!' : '남은 금액'}
                  </div>
                </div>
              </div>

              {/* 하루 평균 필요 금액 안내 */}
              <div className="bg-gray-50 rounded-lg p-3 border border-gray-200">
                <div className="text-sm text-gray-700 text-center">이번달 목표 달성을 위해 하루 평균 <span className="font-semibold text-blue-600">{formatCurrency((corePerformance.targetApe - corePerformance.currentApe) / 7 * 10000)}</span>이 필요해요!</div>
              </div>

              {/* 지점장 기여도 정보 */}
              <div className="mt-4 pt-3 border-t">
                <div className="bg-blue-50 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-3">
                    <div className="text-sm font-semibold text-gray-700">기여도</div>
                    <div className="text-xs text-gray-600 bg-white px-2 py-1 rounded">글로벌화이브스타 지점</div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-white rounded-lg p-3 text-center border border-blue-200">
                      <div className="text-xs text-gray-500 mb-2">목표 담당률</div>
                      <div className="text-2xl font-bold text-blue-600 mb-1">{corePerformance.managerPlanContribution}%</div>
                      <div className="text-xs text-blue-600">{formatCurrency(corePerformance.branchTargetApe * 10000)} / {formatCurrency(corePerformance.managerPersonalTarget * 10000)}</div>
                    </div>
                    <div className="bg-white rounded-lg p-3 text-center border border-green-200">
                      <div className="text-xs text-gray-500 mb-2">실적 기여율</div>
                      <div className="text-2xl font-bold text-green-600 mb-1">{corePerformance.managerContributionRate}%</div>
                      <div className="text-xs text-green-600">{formatCurrency(corePerformance.currentApe * 10000)} / {formatCurrency(corePerformance.managerApe * 10000)}</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* 설계 & 청약 */}
            <div className="grid grid-cols-2 gap-3">
              <div className="bg-white rounded-lg shadow-sm border p-4">
                <h4 className="text-sm font-semibold text-gray-700 mb-3">설계</h4>
                
                {/* 메인 수치 영역 */}
                <div className="text-center mb-3">
                  <div className="text-2xl font-bold text-blue-600">{corePerformance.proposalCount}<span className="text-base text-gray-500">건</span> <span className="text-xs text-gray-400">(일평균 {corePerformance.proposalDailyAverage}건)</span></div>
                </div>
                
                {/* 전월 대비 영역 */}
                <div className="text-center mb-3 pb-3 border-b border-gray-100">
                  <span className="text-xs text-gray-500">전월 동기 대비 {corePerformance.proposalGrowth > 0 ? '▲' : '▼'} </span>
                  <span className={`text-sm font-medium ${corePerformance.proposalGrowth > 0 ? 'text-green-600' : 'text-red-600'}`}>{Math.abs(corePerformance.proposalGrowth)}건</span>
                </div>
                
                {/* 전환율 영역 */}
                <div className="text-center bg-gray-50 rounded px-2 py-1">
                  <span className="text-xs text-gray-600">설계 → 청약 95건</span>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow-sm border p-4">
                <h4 className="text-sm font-semibold text-gray-700 mb-3">청약</h4>
                
                {/* 메인 수치 영역 */}
                <div className="text-center mb-3">
                  <div className="text-2xl font-bold text-blue-600">{corePerformance.contractCount}<span className="text-base text-gray-500">건</span> <span className="text-xs text-gray-400">(일평균 {corePerformance.contractDailyAverage}건)</span></div>
                </div>
                
                {/* 전월 대비 영역 */}
                <div className="text-center mb-3 pb-3 border-b border-gray-100">
                  <span className="text-xs text-gray-500">전월 동기 대비 {corePerformance.contractGrowth > 0 ? '▲' : '▼'} </span>
                  <span className={`text-sm font-medium ${corePerformance.contractGrowth > 0 ? 'text-green-600' : 'text-red-600'}`}>{Math.abs(corePerformance.contractGrowth)}건</span>
                </div>
                
                {/* 계약 상태 분석 */}
                <div className="text-center bg-gray-50 rounded px-2 py-1">
                  <span className="text-xs text-gray-600">계약 87건 | 철회 3건 | 반송 5건</span>
                </div>
              </div>
            </div>


            {/* 일별 실적 추이 */}
            <div className="bg-white rounded-lg shadow-sm border p-4">
              <div className="flex items-start justify-between mb-4">
                <h3 className="text-sm font-semibold text-gray-700">이번달 일별 실적</h3>
                
                <div className="text-right space-y-1">
                  {/* 지표 선택 */}
                  <div className="flex bg-gray-100 rounded-lg p-1">
                    {['일 APE', '청약 건수'].map(metric => (
                      <button
                        key={metric}
                        onClick={() => setDailyMetric(metric as any)}
                        className={`px-2 py-1 text-xs font-medium rounded transition-colors ${
                          dailyMetric === metric
                            ? 'bg-white text-gray-900 shadow-sm'
                            : 'text-gray-600 hover:text-gray-900'
                        }`}
                      >
                        {metric}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
              
              <div className="h-48 relative bg-gray-50 rounded-lg p-4" onMouseLeave={() => setHoveredDayData(null)}>
                {/* 평균값 라벨 */}
                <div className="absolute top-2 right-2 text-xs text-gray-600 flex items-center gap-1">
                  <div className="w-3 h-0.5 bg-yellow-400" style={{width: '12px'}}></div>
                  일 평균: {(() => {
                    const currentData = dailyPerformance.filter(d => !d.isWeekend);
                    const values = dailyMetric === '일 APE' 
                      ? currentData.map(d => d.apeAmount) 
                      : currentData.map(d => d.contractCount);
                    const average = values.reduce((sum, val) => sum + val, 0) / values.length;
                    return dailyMetric === '일 APE' 
                      ? `${average.toFixed(0)}만원`
                      : `${average.toFixed(1)}건`;
                  })()} 
                </div>
                {/* 평균선 */}
                <svg className="absolute inset-4 w-[calc(100%-2rem)] h-[calc(100%-2rem)]" viewBox="0 0 100 100" preserveAspectRatio="none" style={{zIndex: 1, pointerEvents: 'none'}}>
                  {(() => {
                    const currentData = dailyPerformance.filter(d => !d.isWeekend);
                    const values = dailyMetric === '일 APE' 
                      ? currentData.map(d => d.apeAmount) 
                      : currentData.map(d => d.contractCount);
                    const average = values.reduce((sum, val) => sum + val, 0) / values.length;
                    const maxValue = Math.max(...values);
                    const avgY = 100 - ((average / maxValue) * 80);
                    
                    return (
                      <g>
                        <line
                          x1="0" y1={avgY} x2="100" y2={avgY}
                          stroke="#fbbf24" 
                          strokeWidth="1" 
                          strokeDasharray="2,1" 
                          opacity="0.8"
                        />
                        {/* 투명한 호버 영역 */}
                        <line
                          x1="0" y1={avgY} x2="100" y2={avgY}
                          stroke="transparent" 
                          strokeWidth="6"
                          style={{cursor: 'pointer'}}
                          onMouseEnter={() => setHoveredAverage({type: 'daily', value: average})}
                          onMouseLeave={() => setHoveredAverage(null)}
                        />
                      </g>
                    );
                  })()}
                </svg>
                
                {/* 평균값 툴팁 */}
                {hoveredAverage && hoveredAverage.type === 'daily' && (
                  <div className="absolute top-4 left-1/2 transform -translate-x-1/2 bg-yellow-500 text-white text-xs rounded px-2 py-1 z-30">
                    평균: {dailyMetric === '일 APE' 
                      ? `${formatCurrency(hoveredAverage.value * 10000)}`
                      : `${hoveredAverage.value.toFixed(1)}건`
                    }
                  </div>
                )}
                
                {/* 막대 그래프 */}
                <div className="flex items-end justify-center gap-2 h-full relative" style={{paddingTop: '20px'}}>
                  {dailyPerformance.map((data, i) => {
                    if (data.isWeekend) return null;
                    
                    const currentValue = dailyMetric === '일 APE' ? data.apeAmount : data.contractCount;
                    const maxValue = dailyMetric === '일 APE' 
                      ? Math.max(...dailyPerformance.filter(d => !d.isWeekend).map(d => d.apeAmount))
                      : Math.max(...dailyPerformance.filter(d => !d.isWeekend).map(d => d.contractCount));
                    
                    const barHeight = currentValue === 0 ? 2 : (currentValue / maxValue) * 120;
                    const healthHeight = (barHeight * data.healthRatio) / 100;
                    const lifeHeight = (barHeight * data.lifeRatio) / 100;
                    
                    return (
                      <div key={data.day} className="flex flex-col items-center relative" style={{width: '12px'}}>
                        {/* 막대 그래프 - 건강(파란색) + 종신(초록색) */}
                        <div 
                          className="w-full rounded cursor-pointer hover:opacity-80 transition-opacity relative"
                          style={{height: `${barHeight}px`}}
                          onMouseEnter={() => setHoveredDayData({...data, idx: i})}
                        >
                          {/* 건강보험 (하단) */}
                          <div 
                            className="w-full bg-blue-500 rounded-b"
                            style={{height: `${healthHeight}px`, position: 'absolute', bottom: 0}}
                          />
                          {/* 종신/정기 (상단) */}
                          <div 
                            className="w-full bg-green-500 rounded-t"
                            style={{height: `${lifeHeight}px`, position: 'absolute', top: 0}}
                          />
                        </div>
                        
                        {/* 일자 */}
                        <div className="text-xs text-gray-500 mt-1">{data.day}</div>
                        
                        {/* 툴팁 */}
                        {hoveredDayData && hoveredDayData.idx === i && (
                          <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 bg-gray-800 text-white text-xs rounded px-2 py-1 whitespace-nowrap z-20">
                            <div>9월 {data.day}일</div>
                            <div>{dailyMetric === '일 APE' ? `APE: ${formatCurrency(data.apeAmount * 10000)}` : `청약: ${data.contractCount}건`}</div>
                            <div>건강: {data.healthRatio}% | 종신/정기: {data.lifeRatio}%</div>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
              
              {/* 범례 */}
              <div className="flex items-center justify-center gap-4 mt-3 text-xs">
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-blue-500 mr-1 rounded"></div>
                  <span className="text-xs text-gray-600">건강</span>
                </div>
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-green-500 mr-1 rounded"></div>
                  <span className="text-xs text-gray-600">종신/정기</span>
                </div>
              </div>
            </div>

            {/* 월별 실적 추이 */}
            <div className="bg-white rounded-lg shadow-sm border p-4">
              <div className="flex items-start justify-between mb-4">
                <h3 className="text-sm font-semibold text-gray-700">월별 실적 추이</h3>
                
                <div className="text-right space-y-1">
                  {/* 지표 선택 */}
                  <div className="flex bg-gray-100 rounded-lg p-1">
                    {['월 APE', '청약 건수'].map(metric => (
                      <button
                        key={metric}
                        onClick={() => setSelectedMetric(metric)}
                        className={`px-2 py-1 text-xs font-medium rounded transition-colors ${
                          selectedMetric === metric
                            ? 'bg-white text-gray-900 shadow-sm'
                            : 'text-gray-600 hover:text-gray-900'
                        }`}
                      >
                        {metric}
                      </button>
                    ))}
                  </div>
                  
                  {/* 연도 선택 */}
                  <div className="flex gap-1">
                    {['2023', '2024', '2025'].map(year => (
                      <button
                        key={year}
                        onClick={() => setSelectedYear(year)}
                        className={`px-1.5 py-0.5 text-xs rounded ${
                          selectedYear === year 
                            ? 'bg-gray-600 text-white' 
                            : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                        }`}
                      >
                        {year}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
              
              <div className="h-52 relative bg-gray-50 rounded-lg p-4" onMouseLeave={() => setHoveredMonthData(null)}>
                {/* 평균값 라벨 */}
                <div className="absolute top-2 right-2 text-xs text-gray-600 flex items-center gap-1">
                  <div className="w-3 h-0.5 bg-yellow-400" style={{width: '12px'}}></div>
                  월 평균(당월 제외): {(() => {
                    const yearData = {
                      '2023': [1200, 1150, 1300, 1100, 1250, 1180, 1350, 1200, 1100, 1050, 950, 800],
                      '2024': [900, 1000, 1100, 950, 1150, 1050, 1200, 1100, 1000, 850, 750, 650],
                      '2025': [850, 920, 875, 1050, 980, 1120, 1030, 1180, 1090]
                    };
                    const contractData = {
                      '2023': [180, 175, 190, 165, 185, 170, 195, 180, 165, 155, 145, 130],
                      '2024': [160, 170, 180, 155, 175, 165, 185, 170, 155, 145, 135, 125],
                      '2025': [155, 168, 152, 179, 164, 186, 171, 195, 178]
                    };
                    const currentData = selectedMetric === '월 APE' ? yearData[selectedYear] : contractData[selectedYear];
                    const average = currentData.reduce((sum, val) => sum + val, 0) / currentData.length;
                    return selectedMetric === '월 APE' 
                      ? `${average.toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ',')}만원`
                      : `${average.toFixed(0)}건`;
                  })()} 
                </div>
                {/* 평균선 */}
                <svg className="absolute inset-4 w-[calc(100%-2rem)] h-[calc(100%-2rem)]" viewBox="0 0 100 100" preserveAspectRatio="none" style={{zIndex: 1, pointerEvents: 'none'}}>
                  {(() => {
                    const yearData = {
                      '2023': [1200, 1150, 1300, 1100, 1250, 1180, 1350, 1200, 1100, 1050, 950, 800],
                      '2024': [900, 1000, 1100, 950, 1150, 1050, 1200, 1100, 1000, 850, 750, 650],
                      '2025': [850, 920, 875, 1050, 980, 1120, 1030, 1180, 1090]
                    };
                    const contractData = {
                      '2023': [180, 175, 190, 165, 185, 170, 195, 180, 165, 155, 145, 130],
                      '2024': [160, 170, 180, 155, 175, 165, 185, 170, 155, 145, 135, 125],
                      '2025': [155, 168, 152, 179, 164, 186, 171, 195, 178]
                    };
                    
                    const currentData = selectedMetric === '월 APE' ? yearData[selectedYear] : contractData[selectedYear];
                    const average = currentData.reduce((sum, val) => sum + val, 0) / currentData.length;
                    const maxValue = Math.max(...currentData);
                    const avgY = 100 - ((average / maxValue) * 80);
                    
                    return (
                      <g>
                        <line
                          x1="0" y1={avgY} x2="91.7" y2={avgY}
                          stroke="#fbbf24"
                          strokeWidth="1"
                          strokeDasharray="2,1"
                          opacity="0.8"
                        />
                        {/* 투명한 호버 영역 */}
                        <line
                          x1="0" y1={avgY} x2="91.7" y2={avgY}
                          stroke="transparent"
                          strokeWidth="6"
                          style={{cursor: 'pointer'}}
                          onMouseEnter={() => setHoveredAverage({type: 'monthly', value: average})}
                          onMouseLeave={() => setHoveredAverage(null)}
                        />
                      </g>
                    );
                  })()}
                </svg>
                
                {/* 평균값 툴팁 */}
                {hoveredAverage && hoveredAverage.type === 'monthly' && (
                  <div className="absolute top-4 left-1/2 transform -translate-x-1/2 bg-yellow-500 text-white text-xs rounded px-2 py-1 z-30">
                    평균: {selectedMetric === '월 APE' 
                      ? `${formatCurrency(hoveredAverage.value * 10000)}`
                      : `${hoveredAverage.value.toFixed(1)}건`
                    }
                  </div>
                )}
                
                {/* 막대 그래프 */}
                <div className="flex items-end justify-center gap-3 h-full relative" style={{paddingTop: '20px'}}>
                  {(() => {
                    // 고정된 데이터 사용 (연도와 지표별로)
                    const monthCount = selectedYear === '2025' ? 9 : 12;
                    const currentMonthData = [];
                    
                    // 연도별 고정 데이터
                    const yearData = {
                      '2023': [1200, 1150, 1300, 1100, 1250, 1180, 1350, 1200, 1100, 1050, 950, 800],
                      '2024': [900, 1000, 1100, 950, 1150, 1050, 1200, 1100, 1000, 850, 750, 650],
                      '2025': [850, 920, 875, 1050, 980, 1120, 1030, 1180, 1090]
                    };
                    
                    const contractData = {
                      '2023': [180, 175, 190, 165, 185, 170, 195, 180, 165, 155, 145, 130],
                      '2024': [160, 170, 180, 155, 175, 165, 185, 170, 155, 145, 135, 125],
                      '2025': [155, 168, 152, 179, 164, 186, 171, 195, 178]
                    };
                    
                    const apeValues = yearData[selectedYear as keyof typeof yearData];
                    const contractValues = contractData[selectedYear as keyof typeof contractData];
                    
                    for (let i = 0; i < monthCount; i++) {
                      currentMonthData.push({
                        month: `${i+1}월`,
                        ape: apeValues[i], // 만원 단위
                        contracts: contractValues[i],
                        healthRatio: 65, // 고정 비율
                        healthApe: Math.floor(apeValues[i] * 0.65),
                        lifeApe: Math.floor(apeValues[i] * 0.35),
                        healthContracts: Math.floor(contractValues[i] * 0.65),
                        lifeContracts: Math.floor(contractValues[i] * 0.35)
                      });
                    }
                    
                    const maxValue = selectedMetric === '월 APE' 
                      ? Math.max(...currentMonthData.map(d => d.ape))
                      : Math.max(...currentMonthData.map(d => d.contracts));
                    
                    return currentMonthData.map((data, idx) => {
                      const value = selectedMetric === '월 APE' ? data.ape : data.contracts;
                      const barHeight = Math.min((value / maxValue) * 120, 120);
                      const healthHeight = (barHeight * 65) / 100;
                      const lifeHeight = barHeight - healthHeight;
                      
                      
                      return (
                        <div key={idx} className="flex flex-col items-center relative" style={{
                          height: '160px', 
                          width: monthCount <= 9 ? '50px' : '35px'
                        }}>
                          {/* 차트 영역 */}
                          <div className="relative flex justify-center" style={{height: '120px', width: '100%'}}>
                            {/* 막대 */}
                            <div
                              className="w-6 rounded-t hover:opacity-80 transition-opacity cursor-pointer absolute bottom-0 overflow-hidden"
                              style={{height: `${barHeight}px`}}
                              onMouseEnter={() => setHoveredMonthData({...data, idx, value})}
                            >
                              {/* 종신/정기 부분 (상단) */}
                              <div 
                                className="w-full bg-green-500"
                                style={{height: `${lifeHeight}px`}}
                              />
                              {/* 건강 부분 (하단) */}
                              <div 
                                className="w-full bg-blue-500"
                                style={{height: `${healthHeight}px`}}
                              />
                            </div>
                            
                          </div>
                          
                          {/* 월 라벨 - 숫자만 표시 */}
                          <div className="text-xs text-gray-500 mt-2">
                            {idx + 1}
                          </div>
                          
                          {/* 툴팁 */}
                          {hoveredMonthData && hoveredMonthData.idx === idx && (
                            <div className="absolute top-2 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xs rounded px-3 py-2 whitespace-nowrap z-20 shadow-lg">
                              <div className="font-bold mb-1">{data.month} 실적</div>
                              {selectedMetric === '월 APE' ? (
                                <>
                                  <div>총 APE: {formatCurrency(data.ape * 10000)}</div>
                                  <div className="text-blue-300">건강: {formatCurrency(data.healthApe * 10000)}</div>
                                  <div className="text-green-300">종신/정기: {formatCurrency(data.lifeApe * 10000)}</div>
                                </>
                              ) : (
                                <>
                                  <div>총 청약: {data.contracts}건</div>
                                  <div className="text-blue-300">건강: {data.healthContracts}건</div>
                                  <div className="text-green-300">종신/정기: {data.lifeContracts}건</div>
                                </>
                              )}
                            </div>
                          )}
                        </div>
                      );
                    })
                  })()}
                </div>
                
                {/* 범례 - 차트 내부 하단 가운데 */}
                <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex items-center gap-3 text-xs">
                  <div className="flex items-center gap-1">
                    <div className="w-3 h-3 bg-blue-500 rounded"></div>
                    <span className="text-xs text-gray-600">건강</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <div className="w-3 h-3 bg-green-500 rounded"></div>
                    <span className="text-xs text-gray-600">종신/정기</span>
                  </div>
                </div>
              </div>
            </div>

            {/* 최근 관리 활동 */}
            <div className="bg-white rounded-lg shadow-sm border p-4">
              <h3 className="text-sm font-semibold text-gray-700 mb-4">최근 관리 활동</h3>
              <div className="grid grid-cols-2 gap-3 mb-4">
                <div className="flex items-center justify-between p-3 bg-blue-50 hover:bg-blue-100 rounded-lg border border-blue-200 transition-colors">
                  <div className="flex items-center">
                    <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
                    <span className="text-sm font-medium text-blue-700">교육</span>
                  </div>
                  <span className="text-sm font-bold text-blue-600">9/5 (8일전)</span>
                </div>
                
                <div className="flex items-center justify-between p-3 bg-green-50 hover:bg-green-100 rounded-lg border border-green-200 transition-colors">
                  <div className="flex items-center">
                    <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
                    <span className="text-sm font-medium text-green-700">방문</span>
                  </div>
                  <span className="text-sm font-bold text-green-600">8/28 (16일전)</span>
                </div>
              </div>
              
              {/* 구분선 */}
              <div className="border-t border-gray-200 my-4"></div>
              
              {/* 월별 요약 */}
              <div className="text-sm font-semibold text-gray-700 mb-3">월별 요약</div>
              <div className="bg-gray-50 rounded-lg p-3">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-300">
                      <th className="pb-2 text-left text-xs font-medium text-gray-600">월</th>
                      <th className="pb-2 text-center text-xs font-medium text-gray-600">교육</th>
                      <th className="pb-2 text-center text-xs font-medium text-gray-600">방문</th>
                      <th className="pb-2 text-center text-xs font-medium text-gray-600">App Push</th>
                      <th className="pb-2 text-center text-xs font-medium text-gray-600">SMS</th>
                    </tr>
                  </thead>
                  <tbody>
                    {managementHistory.map((month, idx) => (
                      <tr key={idx}>
                        <td className="py-2 text-xs font-medium text-gray-700">{month.month}</td>
                        <td className="py-2 text-center text-sm font-bold text-gray-900">{month.education.count === 0 ? '-' : month.education.count}</td>
                        <td className="py-2 text-center text-sm font-bold text-gray-900">{month.visit.count === 0 ? '-' : month.visit.count}</td>
                        <td className="py-2 text-center text-sm font-bold text-gray-900">{month.appPush.count === 0 ? '-' : month.appPush.count}</td>
                        <td className="py-2 text-center text-sm font-bold text-gray-900">{month.sms.count === 0 ? '-' : month.sms.count}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* 가운데: 지점 특성 */}
          <div className="space-y-4">
            {/* 지점 특성 정보 */}
            <div>
              <h2 className="text-lg font-bold text-gray-900 flex items-center mb-4">
                <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center mr-3">
                  <Building className="w-5 h-5 text-green-600" />
                </div>
                지점 특성 정보
              </h2>

              <div className="bg-white rounded-lg shadow-sm border p-4 space-y-3">
                <h3 className="text-sm font-semibold text-gray-700 mb-3">기본 정보</h3>
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center">
                    <MapPin className="w-4 h-4 text-gray-500 mr-2" />
                    <span className="text-sm text-gray-600">주소</span>
                  </div>
                  <span className="text-sm font-medium text-gray-900">{branchProfile.address}</span>
                </div>
                
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center">
                    <Phone className="w-4 h-4 text-gray-500 mr-2" />
                    <span className="text-sm text-gray-600">연락처</span>
                  </div>
                  <span className="text-sm font-medium text-gray-900">{branchProfile.phone}</span>
                </div>
                
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center">
                    <Calendar className="w-4 h-4 text-gray-500 mr-2" />
                    <span className="text-sm text-gray-600">제휴일자</span>
                  </div>
                  <span className="text-sm font-medium text-gray-900">{branchProfile.partnershipDate} ({branchProfile.partnershipMonths}개월 경과)</span>
                </div>
              </div>
            </div>

            {/* 고객/계약 특성 */}
            <div>
              <div className="bg-white rounded-lg shadow-sm border p-4">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-sm font-semibold text-gray-700">고객 특성</h3>
                  <div className="text-xs text-gray-500">*직전 3개월 가입 고객 기준</div>
                </div>
                <div className="space-y-4">
                  {/* 연령대 */}
                  <div className="text-center">
                    <div className="text-2xl font-bold text-blue-600 mb-1">{metricsData['average'].customerAge}</div>
                    <div className="text-xs text-gray-500">평균 36.5세</div>
                  </div>
                  
                  {/* 성별 분포 - 시각적 바 */}
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs text-gray-600">여성</span>
                      <span className="text-xs font-medium">52%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
                      <div className="bg-pink-400 h-2 rounded-full" style={{width: '52%'}}></div>
                    </div>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs text-gray-600">남성</span>
                      <span className="text-xs font-medium">48%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-blue-400 h-2 rounded-full" style={{width: '48%'}}></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* 상품 판매 현황 */}
            <div className="bg-white rounded-lg shadow-sm border p-4">
              <h3 className="text-sm font-semibold text-gray-700 mb-3">상품 판매 특성</h3>

              {/* 주력 상품 */}
              <div className="border-t pt-4">
                <h4 className="text-xs font-medium text-gray-600 mb-4 uppercase tracking-wide">매출 비중</h4>

                {/* 상품 비중 바 차트 */}
                <div className="mb-6">
                  <div className="space-y-3">
                    {/* 건강보험 */}
                    <div className="group relative">
                      <div className="flex items-center justify-between mb-1">
                        <div className="flex items-center space-x-2">
                          <span className="text-sm text-gray-700">건강</span>
                          <span className="text-xs text-gray-500">92.1억</span>
                        </div>
                        <span className="text-sm font-medium text-gray-700">65%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-lg h-6 relative overflow-hidden">
                        <div className="bg-blue-500 h-6 rounded-lg transition-all duration-300" style={{width: '65%'}}></div>
                      </div>

                      {/* 호버 툴팁 */}
                      <div className="absolute left-0 top-full mt-2 bg-black text-white text-xs px-3 py-2 rounded opacity-0 group-hover:opacity-100 transition-opacity z-10 pointer-events-none">
                        <div className="font-medium mb-1">직전 3개월 평균 APE</div>
                        <div>• 치아: 28% (25.8억)</div>
                        <div>• 암: 18% (16.6억)</div>
                        <div>• 골담: 12% (11.1억)</div>
                        <div>• 치매: 7% (6.4억)</div>
                      </div>
                    </div>

                    {/* 종신/정기보험 */}
                    <div className="group relative">
                      <div className="flex items-center justify-between mb-1">
                        <div className="flex items-center space-x-2">
                          <span className="text-sm text-gray-700">종신/정기</span>
                          <span className="text-xs text-gray-500">49.6억</span>
                        </div>
                        <span className="text-sm font-medium text-gray-700">35%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-lg h-6 relative overflow-hidden">
                        <div className="bg-green-500 h-6 rounded-lg transition-all duration-300" style={{width: '35%'}}></div>
                      </div>

                      {/* 호버 툴팁 */}
                      <div className="absolute right-0 top-full mt-2 bg-black text-white text-xs px-3 py-2 rounded opacity-0 group-hover:opacity-100 transition-opacity z-20 pointer-events-none">
                        <div className="font-medium mb-1">직전 3개월 평균 APE</div>
                        <div>• 저해지 간편고지체: 25% (12.4억)</div>
                        <div>• 저해지 표준체: 22% (10.9억)</div>
                        <div>• 무해지 간편고지체: 20% (9.9억)</div>
                        <div>• 무해지 표준체: 18% (8.9억)</div>
                        <div>• 정기보험: 15% (7.4억)</div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Top 3 상품 테이블 */}
                <div className="border-t pt-4">
                  <div className="flex items-center justify-between mb-3">
                    <h5 className="text-xs font-medium text-gray-600 uppercase tracking-wide">주력 상품 Top3</h5>

                    {/* 카테고리 선택 버튼 */}
                    <div className="flex bg-gray-100 rounded-lg p-1">
                      <button
                        className={`px-2 py-1 text-xs font-medium rounded transition-colors ${
                          selectedProduct === '건강'
                            ? 'bg-white text-gray-900 shadow-sm'
                            : 'text-gray-600 hover:text-gray-900'
                        }`}
                        onClick={() => setSelectedProduct('건강')}
                      >
                        건강
                      </button>
                      <button
                        className={`px-2 py-1 text-xs font-medium rounded transition-colors ${
                          selectedProduct === '종신/정기'
                            ? 'bg-white text-gray-900 shadow-sm'
                            : 'text-gray-600 hover:text-gray-900'
                        }`}
                        onClick={() => setSelectedProduct('종신/정기')}
                      >
                        종신/정기
                      </button>
                    </div>
                  </div>

                  <div className="bg-gray-50 rounded-lg p-3">
                    {/* 테이블 헤더 */}
                    <div className="grid gap-3 pb-2 border-b border-gray-200 mb-3" style={{gridTemplateColumns: '30px 1fr 70px 60px'}}>
                      <div className="text-xs font-medium text-gray-500">순위</div>
                      <div className="text-xs font-medium text-gray-500">상품명</div>
                      <button
                        onClick={() => setProductSortBy(productSortBy === 'amount' ? 'count' : 'amount')}
                        className={`text-xs font-medium hover:text-blue-600 transition-colors text-right flex items-center justify-end gap-1 ${
                          productSortBy === 'amount' ? 'text-blue-600 font-bold' : 'text-gray-900'
                        }`}
                      >
                        APE
                        {productSortBy === 'amount' && (
                          <ArrowDown className="w-3 h-3" />
                        )}
                      </button>
                      <button
                        onClick={() => setProductSortBy(productSortBy === 'count' ? 'amount' : 'count')}
                        className={`text-xs font-medium hover:text-blue-600 transition-colors text-right flex items-center justify-end gap-1 ${
                          productSortBy === 'count' ? 'text-blue-600 font-bold' : 'text-gray-900'
                        }`}
                      >
                        건수
                        {productSortBy === 'count' && (
                          <ArrowDown className="w-3 h-3" />
                        )}
                      </button>
                    </div>

                    {/* 테이블 내용 */}
                    <div className="space-y-1">
                      {getTopProducts().map((product: any, idx: number) => (
                        <div
                          key={product.rank}
                          className="grid gap-3 p-2 hover:bg-blue-50 rounded-lg cursor-pointer transition-all"
                          style={{gridTemplateColumns: '30px 1fr 70px 60px'}}
                        >
                          <div className="flex items-center">
                            <div className={`w-4 h-4 rounded-full flex items-center justify-center text-xs font-bold ${
                              idx < 3 ? 'bg-yellow-400 text-yellow-900' : 'bg-gray-200 text-gray-600'
                            }`}>
                              {product.rank}
                            </div>
                          </div>
                          <div className="flex items-start min-w-0 py-1">
                            <div className="text-xs font-medium text-gray-900 leading-tight">
                              {product.name}
                            </div>
                          </div>
                          <div className="flex items-center justify-end">
                            <div className={`text-xs ${
                              productSortBy === 'amount' ? 'text-blue-600 font-bold' : 'text-gray-900'
                            }`}>{product.amount}</div>
                          </div>
                          <div className="flex items-center justify-end">
                            <div className={`text-xs ${
                              productSortBy === 'count' ? 'text-blue-600 font-bold' : 'text-gray-900'
                            }`}>{product.count}</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>

          </div>

          {/* 오른쪽: 설계사 현황 */}
          <div className="space-y-4">
            <h2 className="text-lg font-bold text-gray-900 flex items-center">
              <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center mr-3">
                <Users className="w-5 h-5 text-purple-600" />
              </div>
              설계사 현황
            </h2>

            {/* 전체 위촉 설계사 */}
            <div className="bg-white rounded-lg shadow-sm border p-4">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-semibold text-gray-700">전체 위촉 설계사</h3>
                <button
                  onClick={() => handleShowAllAgents()}
                  className="text-xs text-gray-500 hover:text-gray-700 font-medium"
                >
                  전체보기 {'>'}
                </button>
              </div>
              
              <div className="text-center mb-4">
                <div className="text-3xl font-bold text-blue-600">{currentAgentStatus.total}<span className="text-base text-gray-500">명</span></div>
              </div>
              
              <div className="grid grid-cols-2 gap-3 text-sm mb-4">
                <div className="text-center p-3 bg-green-50 rounded-lg">
                  <div className="text-lg font-bold text-green-600">+{currentAgentStatus.newThisMonth}</div>
                  <div className="text-xs text-gray-600">당월 신규</div>
                </div>
                <div className="text-center p-3 bg-red-50 rounded-lg">
                  <div className="text-lg font-bold text-red-600">-{currentAgentStatus.resignedThisMonth}</div>
                  <div className="text-xs text-gray-600">당월 해촉</div>
                </div>
              </div>
              
              <div className="border-t pt-4 space-y-3">
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center">
                    <User className="w-4 h-4 text-gray-500 mr-2" />
                    <span className="text-sm text-gray-600">평균 연령</span>
                  </div>
                  <span className="text-sm font-medium">{branchProfile.designerAvgAge}세</span>
                </div>
                
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center">
                    <Briefcase className="w-4 h-4 text-gray-500 mr-2" />
                    <span className="text-sm text-gray-600">평균 경력</span>
                  </div>
                  <span className="text-sm font-medium">{branchProfile.designerAvgCareer}년</span>
                </div>
              </div>
            </div>

            {/* 설계사 가동 */}
            <div className="bg-white rounded-lg shadow-sm border p-4">
              <h3 className="text-sm font-semibold text-gray-700 mb-4">설계사 가동</h3>
              
              <div className="text-center mb-4">
                <div className="text-3xl font-bold text-indigo-600">{currentAgentStatus.active}<span className="text-base text-gray-500">명</span></div>
                <div className="text-sm text-gray-600 mt-1">전체 대비 {Math.round(currentAgentStatus.active / currentAgentStatus.total * 100)}% 가동률</div>
              </div>

              <div className="border-t pt-4 space-y-3">
                <div 
                  onClick={() => handleCategoryClick('continuous6Months')}
                  className="flex items-center justify-between p-3 bg-gray-50 hover:bg-gray-100 rounded-lg border border-gray-200 cursor-pointer transition-colors"
                >
                  <div className="flex items-center">
                    <div className="w-2 h-2 bg-gray-400 rounded-full mr-3"></div>
                    <span className="text-sm font-medium text-gray-700">6개월 연속</span>
                  </div>
                  <span className="text-sm font-bold text-gray-600">{currentAgentStatus.continuous6Months}명</span>
                </div>
                
                <div 
                  onClick={() => handleCategoryClick('continuous3Months')}
                  className="flex items-center justify-between p-3 bg-gray-50 hover:bg-gray-100 rounded-lg border border-gray-200 cursor-pointer transition-colors"
                >
                  <div className="flex items-center">
                    <div className="w-2 h-2 bg-gray-400 rounded-full mr-3"></div>
                    <span className="text-sm font-medium text-gray-700">3개월 연속</span>
                  </div>
                  <span className="text-sm font-bold text-gray-600">{currentAgentStatus.continuous3Months}명</span>
                </div>
                
                <div 
                  onClick={() => handleCategoryClick('continuous2Months')}
                  className="flex items-center justify-between p-3 bg-gray-50 hover:bg-gray-100 rounded-lg border border-gray-200 cursor-pointer transition-colors"
                >
                  <div className="flex items-center">
                    <div className="w-2 h-2 bg-gray-400 rounded-full mr-3"></div>
                    <span className="text-sm font-medium text-gray-700">2개월 연속</span>
                  </div>
                  <span className="text-sm font-bold text-gray-600">{currentAgentStatus.continuous2Months}명</span>
                </div>
                
                <div 
                  onClick={() => handleCategoryClick('newActive')}
                  className="flex items-center justify-between p-3 bg-blue-50 hover:bg-blue-100 rounded-lg border border-blue-200 cursor-pointer transition-colors"
                >
                  <div className="flex items-center">
                    <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
                    <span className="text-sm font-medium text-blue-700">당월 신규 가동</span>
                  </div>
                  <span className="text-sm font-bold text-blue-600">{currentAgentStatus.newActive}명</span>
                </div>
                
                <div 
                  onClick={() => handleCategoryClick('previousActiveNowInactive')}
                  className="flex items-center justify-between p-3 bg-red-50 hover:bg-red-100 rounded-lg border border-red-200 cursor-pointer transition-colors"
                >
                  <div className="flex items-center">
                    <div className="w-2 h-2 bg-red-500 rounded-full mr-3"></div>
                    <span className="text-sm font-medium text-red-700">전월 가동 → 무실적</span>
                  </div>
                  <span className="text-sm font-bold text-red-600">{currentAgentStatus.previousActiveNowInactive}명</span>
                </div>
              </div>
            </div>

            {/* 우수 설계사 TOP5 */}
            <div className="bg-white rounded-lg shadow-sm border p-4">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-semibold text-gray-700">우수 설계사 TOP5</h3>
                <div className="relative inline-flex bg-gray-100 rounded-lg p-1">
                  <button
                    onClick={() => setAgentPeriod('current')}
                    className={`px-3 py-1 text-xs font-medium rounded-md transition-all duration-200 ${
                      agentPeriod === 'current'
                        ? 'bg-white text-gray-900 shadow-sm'
                        : 'text-gray-600 hover:text-gray-900'
                    }`}
                    title="현재까지의 모멘텀을 확인하세요"
                  >
                    당월
                  </button>
                  <button
                    onClick={() => setAgentPeriod('previous')}
                    className={`px-3 py-1 text-xs font-medium rounded-md transition-all duration-200 ${
                      agentPeriod === 'previous'
                        ? 'bg-white text-gray-900 shadow-sm'
                        : 'text-gray-600 hover:text-gray-900'
                    }`}
                    title="완성된 월 실적을 확인하세요"
                  >
                    전월
                  </button>
                </div>
              </div>
              
              {/* 테이블 형태 */}
              <div className="overflow-hidden">
                {/* 헤더 */}
                <div className="grid gap-2 pb-2 border-b border-gray-200 mb-3" style={{gridTemplateColumns: '30px 1fr 70px 50px 90px'}}>
                  <div className="text-xs font-medium text-gray-500">순위</div>
                  <div className="text-xs font-medium text-gray-500">설계사</div>
                  <div className="text-xs font-medium text-gray-500 flex items-center gap-1">
                    MMP
                    <span className="text-blue-600">↓</span>
                  </div>
                  <div className="text-xs font-medium text-gray-500">청약건수</div>
                  <div className="text-xs font-medium text-gray-500">상품구성</div>
                </div>
                
                {/* 데이터 행 */}
                <div className="space-y-1">
                  {getSortedAgents(false).map((agent, idx) => {
                    
                    return (
                      <div 
                        key={idx} 
                        className="grid gap-2 p-2 rounded-lg"
                        style={{gridTemplateColumns: '30px 1fr 70px 50px 90px'}}
                      >
                        <div className="flex items-center">
                          <div className={`w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold ${
                            idx < 5 ? 'bg-yellow-400 text-yellow-900' : 'bg-gray-200 text-gray-600'
                          }`}>
                            {idx + 1}
                          </div>
                        </div>
                        <div className="flex items-center min-w-0">
                          <div className="text-sm font-medium text-gray-900 truncate">{agent.name}</div>
                        </div>
                        <div className="flex items-center">
                          <div className="text-sm font-bold text-blue-600">
                            {agentPeriod === 'current' 
                              ? agent.currentMonth.premium 
                              : agent.previousMonth.premium}만원
                          </div>
                        </div>
                        <div className="flex items-center">
                          <div className="text-sm font-bold text-gray-600">
                            {agentPeriod === 'current' 
                              ? agent.currentMonth.contracts 
                              : agent.previousMonth.contracts}건
                          </div>
                        </div>
                        <div className="flex items-center">
                          <div className="w-full">
                            <div className="flex h-2 rounded-full overflow-hidden bg-gray-200">
                              <div 
                                className="bg-blue-500" 
                                style={{width: `${agent.productMix.health}%`}}
                                title={`건강 ${agent.productMix.health}%`}
                              ></div>
                              <div
                                className="bg-green-500"
                                style={{width: `${agent.productMix.life}%`}}
                                title={`종신/정기 ${agent.productMix.life}%`}
                              ></div>
                            </div>
                            <div className="text-xs text-gray-500 mt-1 text-center">
                              {agent.productMix.health}% : {agent.productMix.life}%
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
              
              {/* 상품 구성 범례 */}
              <div className="flex items-center justify-center gap-4 mt-3 mb-3 text-xs">
                <div className="flex items-center gap-1">
                  <div className="w-3 h-2 bg-blue-500 rounded"></div>
                  <span className="text-xs text-gray-600">건강</span>
                </div>
                <div className="flex items-center gap-1">
                  <div className="w-3 h-2 bg-green-500 rounded"></div>
                  <span className="text-xs text-gray-600">종신/정기</span>
                </div>
              </div>
              
              {/* 전체보기 버튼 */}
              <div className="text-center pt-3 border-t border-gray-100">
                <button 
                  onClick={() => setShowAllAgentsModal(true)}
                  className="px-3 py-1.5 bg-gray-100 hover:bg-gray-200 text-gray-700 text-sm font-medium rounded flex items-center justify-center mx-auto gap-1"
                >
                  <Download className="w-3 h-3" />
                  전체 47명 설계사 순위 보기
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* 에이전트 리스트 모달 */}
      {agentListModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50" onClick={() => setAgentListModal(false)}>
          <div className="bg-white rounded-lg p-6 max-w-lg w-full mx-4 max-h-[80vh] flex flex-col" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">
                {selectedAgentCategory === 'continuous6Months' && '6개월 연속 가동 설계사'}
                {selectedAgentCategory === 'continuous3Months' && '3개월 연속 가동 설계사'}
                {selectedAgentCategory === 'continuous2Months' && '2개월 연속 가동 설계사'}
                {selectedAgentCategory === 'newActive' && '당월 신규 가동 설계사'}
                {selectedAgentCategory === 'previousActiveNowInactive' && '전월 가동 → 무실적 설계사'}
                {selectedAgentCategory === 'inactive' && '미가동 설계사'}
                {selectedAgentCategory === 'allAgents' && '전체 소속 설계사'}
              </h3>
              <button 
                onClick={() => setAgentListModal(false)}
                className="text-gray-500 hover:text-gray-700 text-xl"
              >
                ✕
              </button>
            </div>
            
            <div className="flex-1 overflow-y-auto">
              {/* 테이블 헤더 */}
              <div className="bg-gray-100 rounded-t-lg border-b">
                <div className="grid grid-cols-5 gap-3 p-3 text-xs font-semibold text-gray-700">
                  <div>설계사 코드</div>
                  <div>이름</div>
                  <button
                    onClick={() => {
                      if (agentSortBy === 'commission') {
                        setAgentSortOrder(agentSortOrder === 'desc' ? 'asc' : 'desc');
                      } else {
                        setAgentSortBy('commission');
                        setAgentSortOrder('desc');
                      }
                    }}
                    className="text-left hover:text-blue-600 transition-colors"
                  >
                    위촉 월차 {agentSortBy === 'commission' && (agentSortOrder === 'desc' ? '↓' : '↑')}
                  </button>
                  <button
                    onClick={() => {
                      if (agentSortBy === 'currentMMP') {
                        setAgentSortOrder(agentSortOrder === 'desc' ? 'asc' : 'desc');
                      } else {
                        setAgentSortBy('currentMMP');
                        setAgentSortOrder('desc');
                      }
                    }}
                    className="text-left hover:text-blue-600 transition-colors"
                  >
                    당월 MMP {agentSortBy === 'currentMMP' && (agentSortOrder === 'desc' ? '↓' : '↑')}
                  </button>
                  <button
                    onClick={() => {
                      if (agentSortBy === 'previousMMP') {
                        setAgentSortOrder(agentSortOrder === 'desc' ? 'asc' : 'desc');
                      } else {
                        setAgentSortBy('previousMMP');
                        setAgentSortOrder('desc');
                      }
                    }}
                    className="text-left hover:text-blue-600 transition-colors"
                  >
                    전월 MMP {agentSortBy === 'previousMMP' && (agentSortOrder === 'desc' ? '↓' : '↑')}
                  </button>
                </div>
              </div>
              
              {/* 테이블 내용 */}
              <div className="space-y-0">
                {selectedAgentCategory && (() => {
                  let agentData;

                  if (selectedAgentCategory === 'allAgents') {
                    // 전체 설계사인 경우 getSortedAgents(true) 사용
                    agentData = getSortedAgents(true).map((agent, idx) => {
                      // 위촉 월차 계산
                      const commissionMonths = baseAgentLists.newCommissioned.includes(agent.name)
                        ? 1 // 신규 위촉은 1개월차
                        : baseAgentLists.newActive.includes(agent.name)
                        ? Math.floor(Math.random() * 12) + 3 // 신규 가동은 3-14개월차 (기존 설계사가 처음 실적)
                        : Math.floor(Math.random() * 120) + 1; // 나머지는 1-120개월차

                      return {
                        name: agent.name,
                        code: agent.agentCode,
                        currentMMP: agent.currentMonth.premium,
                        previousMMP: agent.previousMonth.premium,
                        commissionMonths,
                        isActive: agent.isActive,
                        originalIndex: idx
                      };
                    });
                  } else {
                    // 특정 카테고리인 경우 기존 로직 사용
                    agentData = getAgentList(selectedAgentCategory).map((agentName: string, idx: number) => {
                      const agentCode = `AG${String(idx + 1).padStart(3, '0')}`;
                      const currentMMP = selectedAgentCategory === 'previousActiveNowInactive'
                        ? 0
                        : Math.floor(Math.random() * 100) + 10;
                      const previousMMP = selectedAgentCategory === 'newActive'
                        ? 0
                        : selectedAgentCategory === 'previousActiveNowInactive'
                        ? Math.floor(Math.random() * 80) + 20
                        : Math.floor(Math.random() * 100) + 10;
                      const commissionMonths = baseAgentLists.newCommissioned.includes(agentName)
                        ? 1 // 신규 위촉은 1개월차
                        : baseAgentLists.newActive.includes(agentName)
                        ? Math.floor(Math.random() * 12) + 3 // 신규 가동은 3-14개월차
                        : Math.floor(Math.random() * 120) + 1;

                      return {
                        name: agentName,
                        code: agentCode,
                        currentMMP,
                        previousMMP,
                        commissionMonths,
                        isActive: selectedAgentCategory !== 'inactive' && selectedAgentCategory !== 'previousActiveNowInactive',
                        originalIndex: idx
                      };
                    });
                  }

                  // 정렬 적용
                  const sortedData = [...agentData].sort((a, b) => {
                    let aValue: number, bValue: number;

                    switch (agentSortBy) {
                      case 'commission':
                        aValue = a.commissionMonths;
                        bValue = b.commissionMonths;
                        break;
                      case 'currentMMP':
                        aValue = a.currentMMP;
                        bValue = b.currentMMP;
                        break;
                      case 'previousMMP':
                        aValue = a.previousMMP || 0;
                        bValue = b.previousMMP || 0;
                        break;
                      default:
                        aValue = a.originalIndex;
                        bValue = b.originalIndex;
                    }

                    return agentSortOrder === 'desc' ? bValue - aValue : aValue - bValue;
                  });

                  return sortedData.map((agent, idx) => {
                    // 상태에 따른 배경색 설정 (전체 47명과 동일한 로직)
                    let rowBgClass = '';
                    if (selectedAgentCategory === 'allAgents') {
                      if (!agent.isActive && agent.previousMMP > 0) {
                        // 전월 가동 → 무실적
                        rowBgClass = 'bg-red-50';
                      } else if (agent.isActive && agent.previousMMP === 0) {
                        // 당월 신규 가동
                        rowBgClass = 'bg-green-50';
                      }
                    } else {
                      if (selectedAgentCategory === 'previousActiveNowInactive') {
                        rowBgClass = 'bg-red-50';
                      } else if (selectedAgentCategory === 'newActive') {
                        rowBgClass = 'bg-green-50';
                      } else if (selectedAgentCategory === 'inactive') {
                        rowBgClass = 'bg-gray-100';
                      }
                    }

                    return (
                      <div key={idx} className={`border-b hover:bg-gray-50 transition-colors ${rowBgClass}`}>
                        <div className="grid grid-cols-5 gap-3 p-3 text-sm">
                          <div className="font-mono text-gray-600">{agent.code}</div>
                          <div className="font-medium">{agent.name}</div>
                          <div className="text-center text-gray-600">
                            <span className="text-xs">{agent.commissionMonths}개월차</span>
                          </div>
                          <div className="text-right">
                            {agent.currentMMP === 0 ? (
                              <span className="text-gray-400">-</span>
                            ) : (
                              <span className="font-medium">{agent.currentMMP}만원</span>
                            )}
                          </div>
                          <div className="text-right text-gray-600">
                            {agent.previousMMP === 0 || agent.previousMMP === null ? (
                              <span className="text-gray-400">-</span>
                            ) : (
                              <span>{agent.previousMMP}만원</span>
                            )}
                          </div>
                        </div>
                      </div>
                    );
                  });
                })()}
              </div>
            </div>
            
            <div className="mt-4 pt-4 border-t text-center">
              <span className="text-sm text-gray-500">총 {selectedAgentCategory === 'allAgents' ? getSortedAgents(true).length : (selectedAgentCategory ? getAgentList(selectedAgentCategory).length : 0)}명</span>
            </div>
          </div>
        </div>
      )}
      
      {/* 에이전트 상세 모달 */}
      {agentDetailModal && selectedAgent && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50" onClick={() => setAgentDetailModal(false)}>
          <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">{selectedAgent.name} 상세정보</h3>
              <button 
                onClick={() => setAgentDetailModal(false)}
                className="text-gray-500 hover:text-gray-700 text-xl"
              >
                ✕
              </button>
            </div>
            
            <div className="space-y-4">
              <div className={`rounded-lg p-4 ${selectedAgent.isActive ? 'bg-blue-50' : 'bg-gray-50'}`}>
                <h4 className={`font-semibold mb-2 ${selectedAgent.isActive ? 'text-blue-800' : 'text-gray-600'}`}>
                  당월 실적 {!selectedAgent.isActive && '(미가동)'}
                </h4>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-gray-600">보험료</span>
                    <div className={`font-bold ${selectedAgent.isActive ? 'text-blue-700' : 'text-gray-400'}`}>
                      {selectedAgent.isActive ? `${selectedAgent.currentMonth.premium}만원` : '-'}
                    </div>
                  </div>
                  <div>
                    <span className="text-gray-600">건수</span>
                    <div className={`font-bold ${selectedAgent.isActive ? 'text-blue-700' : 'text-gray-400'}`}>
                      {selectedAgent.isActive ? `${selectedAgent.currentMonth.contracts}건` : '-'}
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="bg-gray-50 rounded-lg p-4">
                <h4 className="font-semibold text-gray-800 mb-2">전월 실적</h4>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-gray-600">보험료</span>
                    <div className="font-medium text-gray-700">{selectedAgent.previousMonth.premium}만원</div>
                  </div>
                  <div>
                    <span className="text-gray-600">건수</span>
                    <div className="font-medium text-gray-700">{selectedAgent.previousMonth.contracts}건</div>
                  </div>
                </div>
              </div>
              
              <div className="bg-green-50 rounded-lg p-4">
                <h4 className="font-semibold text-green-800 mb-2">직전 3개월 평균</h4>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-gray-600">평균 보험료</span>
                    <div className="font-medium text-green-700">{selectedAgent.threeMonthAverage?.premium || 0}만원</div>
                  </div>
                  <div>
                    <span className="text-gray-600">평균 건수</span>
                    <div className="font-medium text-green-700">{selectedAgent.threeMonthAverage?.contracts || 0}건</div>
                  </div>
                </div>
              </div>
              
              <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg p-4">
                <h4 className="font-semibold text-gray-800 mb-2">주력 상품 구성</h4>
                <div className="flex h-4 rounded-full overflow-hidden mb-2">
                  <div 
                    className="bg-blue-500" 
                    style={{width: `${selectedAgent.productMix.health}%`}}
                  ></div>
                  <div 
                    className="bg-green-500" 
                    style={{width: `${selectedAgent.productMix.life}%`}}
                  ></div>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-blue-700">건강 {selectedAgent.productMix.health}%</span>
                  <span className="text-purple-700">종신보험 {selectedAgent.productMix.life}%</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      
      {/* 전체 설계사 모달 */}
      {showAllAgentsModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50" onClick={() => setShowAllAgentsModal(false)}>
          <div className="bg-white rounded-lg p-6 max-w-4xl w-full mx-4 max-h-[80vh] flex flex-col" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">전체 설계사 순위</h3>
              <button 
                onClick={() => setShowAllAgentsModal(false)}
                className="text-gray-500 hover:text-gray-700 text-xl"
              >
                ✕
              </button>
            </div>
            
            <div className="flex-1 overflow-y-auto">
              {/* 테이블 헤더 */}
              <div className="bg-gray-100 rounded-t-lg border-b">
                <div className="grid gap-2 p-3 text-xs font-semibold text-gray-700" style={{gridTemplateColumns: '40px 80px 1fr 80px 60px 80px 60px'}}>
                  <div>순위</div>
                  <div>설계사코드</div>
                  <div>설계사명</div>
                  <button 
                    onClick={() => {
                      if (agentSortBy === 'mmp') {
                        setAgentSortOrder(agentSortOrder === 'desc' ? 'asc' : 'desc');
                      } else {
                        setAgentSortBy('mmp');
                        setAgentSortOrder('desc');
                      }
                    }}
                    className="text-left hover:text-blue-600 transition-colors"
                  >
                    당월 MMP {agentSortBy === 'mmp' && (agentSortOrder === 'desc' ? '↓' : '↑')}
                  </button>
                  <button 
                    onClick={() => {
                      if (agentSortBy === 'contracts') {
                        setAgentSortOrder(agentSortOrder === 'desc' ? 'asc' : 'desc');
                      } else {
                        setAgentSortBy('contracts');
                        setAgentSortOrder('desc');
                      }
                    }}
                    className="text-left hover:text-blue-600 transition-colors"
                  >
                    당월 건수 {agentSortBy === 'contracts' && (agentSortOrder === 'desc' ? '↓' : '↑')}
                  </button>
                  <button 
                    onClick={() => {
                      if (agentSortBy === 'prevMmp') {
                        setAgentSortOrder(agentSortOrder === 'desc' ? 'asc' : 'desc');
                      } else {
                        setAgentSortBy('prevMmp');
                        setAgentSortOrder('desc');
                      }
                    }}
                    className="text-left hover:text-blue-600 transition-colors"
                  >
                    전월 MMP {agentSortBy === 'prevMmp' && (agentSortOrder === 'desc' ? '↓' : '↑')}
                  </button>
                  <button 
                    onClick={() => {
                      if (agentSortBy === 'prevContracts') {
                        setAgentSortOrder(agentSortOrder === 'desc' ? 'asc' : 'desc');
                      } else {
                        setAgentSortBy('prevContracts');
                        setAgentSortOrder('desc');
                      }
                    }}
                    className="text-left hover:text-blue-600 transition-colors"
                  >
                    전월 건수 {agentSortBy === 'prevContracts' && (agentSortOrder === 'desc' ? '↓' : '↑')}
                  </button>
                </div>
              </div>
              
              {/* 테이블 내용 */}
              <div className="space-y-0">
                {getSortedAgents(true).map((agent, idx) => {
                  // 상태에 따른 배경색 설정
                  let rowBgClass = '';
                  if (!agent.isActive && agent.previousMonth.premium > 0) {
                    // 전월 가동 → 무실적 (4명)
                    rowBgClass = 'bg-red-50';
                  } else if (agent.isActive && agent.previousMonth.premium === 0) {
                    // 당월 신규 가동 (6명)
                    rowBgClass = 'bg-green-50';
                  }

                  return (
                    <div 
                      key={idx} 
                      className={`grid gap-2 p-3 border-b border-gray-100 hover:bg-gray-50 transition-colors ${rowBgClass}`}
                      style={{gridTemplateColumns: '40px 80px 1fr 80px 60px 80px 60px'}}
                    >
                    <div className="flex items-center">
                      <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                        idx < 5 ? 'bg-yellow-400 text-yellow-900' : 'bg-gray-200 text-gray-600'
                      }`}>
                        {idx + 1}
                      </div>
                    </div>
                    <div className="flex items-center">
                      <div className="font-mono text-sm text-gray-600">{agent.agentCode}</div>
                    </div>
                    <div className="flex items-center">
                      <div className="text-sm font-medium text-gray-900">{agent.name}</div>
                    </div>
                    <div className="flex items-center">
                      {agent.currentMonth.premium > 0 ? (
                        <span className="text-sm font-bold text-gray-900">{agent.currentMonth.premium}만원</span>
                      ) : (
                        <span className="text-sm text-gray-400">-</span>
                      )}
                    </div>
                    <div className="flex items-center">
                      {agent.currentMonth.contracts > 0 ? (
                        <span className="text-sm font-bold text-gray-900">{agent.currentMonth.contracts}건</span>
                      ) : (
                        <span className="text-sm text-gray-400">-</span>
                      )}
                    </div>
                    <div className="flex items-center">
                      {agent.previousMonth.premium > 0 ? (
                        <span className="text-sm font-bold text-gray-900">{agent.previousMonth.premium}만원</span>
                      ) : (
                        <span className="text-sm text-gray-400">-</span>
                      )}
                    </div>
                    <div className="flex items-center">
                      {agent.previousMonth.contracts > 0 ? (
                        <span className="text-sm font-bold text-gray-900">{agent.previousMonth.contracts}건</span>
                      ) : (
                        <span className="text-sm text-gray-400">-</span>
                      )}
                    </div>
                    </div>
                  );
                })}
              </div>
            </div>
            
            <div className="mt-4 pt-4 border-t text-center">
              <span className="text-sm text-gray-500">총 {allAgentsData.length}명 설계사</span>
            </div>
          </div>
        </div>
      )}
      </div>
    </>
  );
};

export default Branch360Dashboard;
                    