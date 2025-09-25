import React, { useState } from 'react';
import { useParams, useNavigate, useSearchParams } from 'react-router-dom';
import { Building, Users, Phone, MapPin, Calendar, TrendingUp, ChevronDown, User, ArrowDown, Download, Briefcase, AlertTriangle, TrendingDown, UserPlus, Search } from 'lucide-react';

const Branch360Dashboard = () => {
  const { agency, branchName } = useParams<{ agency?: string; branchName: string }>();
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();

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

  // 실제 적용된 필터 상태 (쿼리 파라미터에서 가져옴)
  const [selectedPeriod, setSelectedPeriod] = useState(searchParams.get('period') || '2025-09');

  // selectedPeriod에서 연도와 월 추출
  const getCurrentMonth = () => {
    const [year, month] = selectedPeriod.split('-');
    return parseInt(month);
  };

  const getCurrentYear = () => {
    const [year, month] = selectedPeriod.split('-');
    return year;
  };

  const [selectedProduct, setSelectedProduct] = useState<'전체' | '건강' | '종신/정기'>(searchParams.get('product') as '전체' | '건강' | '종신/정기' || '전체');

  // URL에서 받은 파라미터를 기본값으로 설정
  const displayedAgency = agency ? decodeURIComponent(agency) : agencies[0];
  const displayedBranch = branchName ? decodeURIComponent(branchName) : generateBranchesForAgency(displayedAgency)[0];

  const [selectedAgency, setSelectedAgency] = useState(displayedAgency);
  const [selectedBranch, setSelectedBranch] = useState(displayedBranch);

  // 임시 선택 상태 (조회 버튼 누르기 전까지 임시 저장)
  const [tempSelectedPeriod, setTempSelectedPeriod] = useState(selectedPeriod);
  const [tempSelectedAgency, setTempSelectedAgency] = useState(selectedAgency);
  const [tempSelectedBranch, setTempSelectedBranch] = useState(selectedBranch);

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

  // 필터별 데이터 (직전 3개월 평균)
  const getFilteredData = (key: string) => {
    const baseData = {
      ape: { '전체': 41600, '건강': 27000, '종신/정기': 14600 }, // 만원 단위 (직전 3개월 평균)
      dailyApe: { '전체': 1890, '건강': 1220, '종신/정기': 670 }, // 만원 단위
      apeGrowth: { '전체': 12.8, '건강': 15.2, '종신/정기': 9.5 },
      apeGrowthAmount: { '전체': 4700, '건강': 3600, '종신/정기': 1100 },
      dailyApeAmount: { '전체': 1890, '건강': 1220, '종신/정기': 670 },
      apeRatio: { '전체': 100, '건강': 65, '종신/정기': 35 },
      dailyApeGrowth: { '전체': 7.2, '건강': 10.8, '종신/정기': 4.9 },
      design: { '전체': 412, '건강': 268, '종신/정기': 144 },
      dailyDesign: { '전체': 28, '건강': 18, '종신/정기': 10 },
      designGrowth: { '전체': -6, '건강': -4, '종신/정기': -2 },
      contract: { '전체': 248, '건강': 161, '종신/정기': 87 },
      dailyContract: { '전체': 17, '건강': 11, '종신/정기': 6 },
      contractGrowth: { '전체': 15, '건강': 22, '종신/정기': 11 }
    };
    return (baseData as any)[key][selectedProduct] || 0;
  };

  // 상품 포트폴리오 데이터 (직전 3개월 평균)
  const getPortfolioData = () => {
    if (selectedProduct === '전체') {
      return [
        { name: '건강', value: 65, color: '#3b82f6' },
        { name: '종신/정기', value: 35, color: '#10b981' }
      ];
    } else if (selectedProduct === '건강') {
      return [
        { name: '치아', value: 42, color: '#3b82f6' },
        { name: '암', value: 28, color: '#60a5fa' },
        { name: '골담보', value: 18, color: '#93c5fd' },
        { name: '치매', value: 12, color: '#bfdbfe' }
      ];
    } else {
      return [
        { name: '저해지 간편고지체', value: 28, color: '#10b981' },
        { name: '저해지 표준체', value: 24, color: '#34d399' },
        { name: '무해지 간편고지체', value: 22, color: '#6ee7b7' },
        { name: '무해지 표준체', value: 16, color: '#a7f3d0' },
        { name: '정기보험', value: 10, color: '#d1fae5' }
      ];
    }
  };

  // 3년치 월 옵션 생성 (2023년 1월부터 2025년 9월까지)
  const generateMonthOptions = () => {
    const options = [];
    for (let year = 2023; year <= 2025; year++) {
      const endMonth = year === 2025 ? 9 : 12;
      for (let month = 1; month <= endMonth; month++) {
        const value = `${year}-${month.toString().padStart(2, '0')}`;
        const label = `${year}년 ${month}월`;
        options.push({ value, label });
      }
    }
    return options.reverse(); // 최신 순으로 정렬
  };

  const monthOptions = generateMonthOptions();

  // 조회 버튼 핸들러 - 실제로 필터를 적용
  const handleSearch = () => {
    setSelectedPeriod(tempSelectedPeriod);
    setSelectedAgency(tempSelectedAgency);
    setSelectedBranch(tempSelectedBranch);

    // URL 업데이트
    const params = new URLSearchParams(searchParams);
    params.set('period', tempSelectedPeriod);
    setSearchParams(params);

    // 대리점/지점 변경시 URL 네비게이션
    if (tempSelectedAgency !== selectedAgency || tempSelectedBranch !== selectedBranch) {
      navigate(`/branch/${encodeURIComponent(tempSelectedAgency)}/${encodeURIComponent(tempSelectedBranch)}?${params.toString()}`);
    }
  };

  // CSV 다운로드 함수
  const downloadCSV = () => {
    const csvHeaders = [
      '대리점명', '지점명', '당월APE', '목표달성률', '위촉설계사', '가동설계사', '조회기간'
    ];

    const csvData = [
      csvHeaders.join(','),
      `${selectedAgency},${selectedBranch},${corePerformance.currentApe}만원,${corePerformance.achievementRate.toFixed(1)}%,${currentAgentStatus.total}명,${currentAgentStatus.active}명,${selectedPeriod}`
    ];

    const csvContent = '\uFEFF' + csvData.join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');

    if (link.download !== undefined) {
      const url = URL.createObjectURL(blob);
      link.setAttribute('href', url);
      link.setAttribute('download', `${selectedAgency}_${selectedBranch}_지점현황_${selectedPeriod}.csv`);
      link.style.visibility = 'hidden';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  const [showAgencyDropdown, setShowAgencyDropdown] = useState(false);
  const [showBranchDropdown, setShowBranchDropdown] = useState(false);

  // 알림 타입 정의
  type AlertType = '위험' | '기회' | '변화';
  type AlertItem = {
    type: AlertType;
    title: string;
    description: string;
    icon: React.ReactNode;
    color: string;
    bgColor: string;
    priority: number;
  };

  // 지점별 알림 시스템
  const getBranchAlerts = (agency: string, branch: string): AlertItem[] => {
    const alerts: AlertItem[] = [];

    // 메인 화면과 동일한 추천 대상 지점들의 알림

    // 메타리치 > 보험스토어
    if (agency === '메타리치' && branch === '보험스토어') {
      alerts.push({
        type: '위험',
        title: '3개월 연속 실적 하락',
        description: '직전 3개월 연속 전월 대비 총 APE 하락 + APE도 전월 동기보다 낮음',
        icon: <TrendingDown className="w-3 h-3" />,
        color: 'text-red-600',
        bgColor: 'bg-red-100',
        priority: 1
      });
      alerts.push({
        type: '위험',
        title: '목표달성 미달',
        description: '월 영업일 절반 이상 경과 시점에서 목표 페이스 대비 현재 실적 -30% 이상 부진',
        icon: <AlertTriangle className="w-3 h-3" />,
        color: 'text-red-600',
        bgColor: 'bg-red-100',
        priority: 1
      });
      alerts.push({
        type: '기회',
        title: '신규 위촉 발생',
        description: '당월 신규 위촉 인원 1명 이상',
        icon: <UserPlus className="w-3 h-3" />,
        color: 'text-green-600',
        bgColor: 'bg-green-100',
        priority: 2
      });
    }

    // 글로벌금융판매 > 케이에스에프에스동대문
    else if (agency === '글로벌금융판매' && branch === '케이에스에프에스동대문') {
      alerts.push({
        type: '위험',
        title: '목표달성 미달',
        description: '월 영업일 절반 이상 경과 시점에서 목표 페이스 대비 현재 실적 -30% 이상 부진',
        icon: <AlertTriangle className="w-3 h-3" />,
        color: 'text-red-600',
        bgColor: 'bg-red-100',
        priority: 1
      });
      alerts.push({
        type: '위험',
        title: '계약 품질 이슈',
        description: '최근 3 영업일 동안 인수거절/청약철회 2건 이상 발생',
        icon: <AlertTriangle className="w-3 h-3" />,
        color: 'text-red-600',
        bgColor: 'bg-red-100',
        priority: 1
      });
    }

    // 지금용코리아 > 대원
    else if (agency === '지금용코리아' && branch === '대원') {
      alerts.push({
        type: '위험',
        title: '핵심인력 해촉',
        description: '지난달 실적이 있었던 가동 설계사가 이번 달 퇴사',
        icon: <UserPlus className="w-3 h-3" />,
        color: 'text-red-600',
        bgColor: 'bg-red-100',
        priority: 1
      });
    }

    // 더블유에셋 > 일산센터
    else if (agency === '더블유에셋' && branch === '일산센터') {
      alerts.push({
        type: '기회',
        title: '실적 급상승',
        description: '전월 동기 대비 APE +30% 이상 급등',
        icon: <TrendingUp className="w-3 h-3" />,
        color: 'text-green-600',
        bgColor: 'bg-green-100',
        priority: 2
      });
      alerts.push({
        type: '기회',
        title: '고액 계약 체결',
        description: '월 보험료 30만원 이상 계약 체결',
        icon: <Briefcase className="w-3 h-3" />,
        color: 'text-green-600',
        bgColor: 'bg-green-100',
        priority: 2
      });
    }

    // 지에이스타금융서비스 > 그레이트탑
    else if (agency === '지에이스타금융서비스' && branch === '그레이트탑') {
      alerts.push({
        type: '기회',
        title: '신규 가동',
        description: '위촉된 설계사가 당월 생애 첫 계약 성공',
        icon: <UserPlus className="w-3 h-3" />,
        color: 'text-green-600',
        bgColor: 'bg-green-100',
        priority: 2
      });
    }

    // 한국지에이금융서비스 > 케이엘아이케이베스트
    else if (agency === '한국지에이금융서비스' && branch === '케이엘아이케이베스트') {
      alerts.push({
        type: '변화',
        title: '연속 가동자 이탈',
        description: '직전 3개월 연속 가동 상태였던 설계사가 당월 활동 없음',
        icon: <UserPlus className="w-3 h-3" />,
        color: 'text-blue-600',
        bgColor: 'bg-blue-100',
        priority: 3
      });
    }

    // 메가 > 사랑
    else if (agency === '메가' && branch === '사랑') {
      alerts.push({
        type: '변화',
        title: '신규 위촉 발생',
        description: '당월 신규 위촉 인원 1명 이상',
        icon: <UserPlus className="w-3 h-3" />,
        color: 'text-blue-600',
        bgColor: 'bg-blue-100',
        priority: 3
      });
    }

    // 지금용코리아 > 서울
    else if (agency === '지금용코리아' && branch === '서울') {
      alerts.push({
        type: '변화',
        title: '포트폴리오 급변',
        description: '건강 vs 종신/정기 비중이 직전 3개월 평균 대비 ±20%p 이상 변동',
        icon: <TrendingUp className="w-3 h-3" />,
        color: 'text-blue-600',
        bgColor: 'bg-blue-100',
        priority: 3
      });
    }

    return alerts.sort((a, b) => a.priority - b.priority);
  };



  // 임시 선택된 대리점의 지점 목록
  const availableBranches = generateBranchesForAgency(tempSelectedAgency);

  // 대리점 변경 시 첫 번째 지점으로 자동 설정 (임시)
  const handleAgencyChange = (agency: string) => {
    setTempSelectedAgency(agency);
    const newBranches = generateBranchesForAgency(agency);
    setTempSelectedBranch(newBranches[0]);
    setShowAgencyDropdown(false);
  };

  // 지점 변경 (임시)
  const handleBranchChange = (branch: string) => {
    setTempSelectedBranch(branch);
    setShowBranchDropdown(false);
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

  // 선택된 월에 따른 동적 일별 실적 데이터 생성
  const generateDailyPerformance = (yearMonth: string) => {
    const [year, month] = yearMonth.split('-').map(Number);
    const isCurrentMonth = yearMonth === '2025-09';
    const currentDate = new Date(2025, 8, 19); // 2025년 9월 19일 (현재 날짜)

    // 해당 월의 마지막 날짜 구하기 (최대 30일까지만)
    const lastDay = Math.min(new Date(year, month, 0).getDate(), 30);

    // 현재 월이면 19일까지, 과거 월이면 30일까지
    const maxDay = isCurrentMonth ? 19 : lastDay;

    const dailyData = [];

    for (let day = 1; day <= maxDay; day++) {
      const date = new Date(year, month - 1, day);
      const dayOfWeek = date.getDay(); // 0: 일요일, 6: 토요일
      const isWeekend = dayOfWeek === 0 || dayOfWeek === 6;

      if (isWeekend) {
        dailyData.push({
          day,
          apeAmount: 0,
          contractCount: 0,
          isWeekend: true,
          healthRatio: 0,
          lifeRatio: 0
        });
      } else {
        // 영업일 데이터 생성 (일정한 패턴으로)
        const baseApe = 30 + (day * 2) + (day % 7) * 5;
        const apeAmount = Math.max(25, Math.min(65, baseApe));
        const contractCount = Math.max(2, Math.min(6, Math.floor(apeAmount / 12)));
        const healthRatio = 60 + (day % 20);
        const lifeRatio = 100 - healthRatio;

        dailyData.push({
          day,
          apeAmount,
          contractCount,
          isWeekend: false,
          healthRatio,
          lifeRatio
        });
      }
    }

    return dailyData;
  };

  // 현재 선택된 기간에 따른 일별 실적 데이터
  const dailyPerformance = generateDailyPerformance(selectedPeriod);


  // 상태 변수들
  const [hoveredMonthData, setHoveredMonthData] = useState<any>(null);
  const [hoveredDayData, setHoveredDayData] = useState<any>(null);
  const [selectedMetric, setSelectedMetric] = useState<string>('APE');
  const [productSortBy, setProductSortBy] = useState<'amount' | 'count'>('amount');
  const [dailyMetric, setDailyMetric] = useState<'APE' | '청약 건수'>('APE'); // 일별 차트 지표
  const [hoveredAverage, setHoveredAverage] = useState<{type: 'daily' | 'monthly', value: number} | null>(null); // 평균선 호버
  const [showExpectedProgressTooltip, setShowExpectedProgressTooltip] = useState(false); // 기대진도 툴팁

  // 관리 활동 이력 (최근 6개월, 마지막 활동일 포함)
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
    },
    {
      month: '4월',
      education: { count: 2, lastDate: '4/18', daysAgo: 159 },
      visit: { count: 3, lastDate: '4/25', daysAgo: 152 },
      appPush: { count: 16, lastDate: '4/30', daysAgo: 147 },
      sms: { count: 22, lastDate: '4/28', daysAgo: 149 }
    }
  ];

  // 설계사 현황 - 당월 가동 현황
  const [selectedAgentCategory, setSelectedAgentCategory] = useState<string | null>(null);
  const [agentListModal, setAgentListModal] = useState(false);
  const [selectedAgent] = useState<any>(null);
  const [agentDetailModal, setAgentDetailModal] = useState(false);
  const [agentSortBy, setAgentSortBy] = useState('mmp0');
  const [agentSortOrder, setAgentSortOrder] = useState<'desc' | 'asc'>('desc');
  const [showAllAgentsModal, setShowAllAgentsModal] = useState(false);
  const [agentPeriod, setAgentPeriod] = useState<'current' | 'previous'>('current');
  const [topAgentSortOrder, setTopAgentSortOrder] = useState<'asc' | 'desc'>('desc'); // TOP5 테이블 정렬 순서
  const [selectedContinuousTab, setSelectedContinuousTab] = useState<'all' | 'continuous2Months' | 'continuous3Months' | 'continuous6Months' | 'newActive'>('all'); // 우수 설계사 탭 선택
  const [showManagementHistoryModal, setShowManagementHistoryModal] = useState(false); // 관리활동 더보기 모달
  
  const currentAgentStatus = {
    total: 47, // 총 소속 설계사
    active: 29, // 당월 가동 설계사 (12+6+5+6=29명)
    newThisMonth: 2, // 당월 신규 위촉 (새로 입사한 설계사)
    resignedThisMonth: 1, // 당월 해촉
    netChange: 1, // 순증감 (신규위촉2 - 해촉1)
    continuous6Months: 8, // 6개월 연속 가동 (순수 6개월만)
    continuous3Months: 15, // 3개월 연속 가동 (6개월 8명 + 3개월 7명 = 15명)
    continuous2Months: 23, // 2개월 연속 가동 (3개월 15명 + 2개월 8명 = 23명)
    newActive: 6 // 전월 미가동→가동 전환
  };


  // 에이전트 리스트 데이터 (포함 관계로 정리)
  const baseAgentLists = {
    // 6개월 연속 가동 (순수 6개월만)
    continuous6Months: [
      '이지은', '김선호', '김준영', '이하늘', '박상호', '정미선', '조영수', '차서영'
    ],
    // 3개월 연속 가동 (6개월 포함 + 3개월 순수)
    continuous3Months: [
      // 6개월 연속
      '이지은', '김선호', '김준영', '이하늘', '박상호', '정미선', '조영수', '차서영',
      // 3개월 순수
      '손민준', '박지수', '정동현', '차민정', '박지영', '정예린', '조은경'
    ],
    // 2개월 연속 가동 (3개월 모두 포함 + 2개월 순수)
    continuous2Months: [
      // 6개월 연속
      '이지은', '김선호', '김준영', '이하늘', '박상호', '정미선', '조영수', '차서영',
      // 3개월 순수
      '손민준', '박지수', '정동현', '차민정', '박지영', '정예린', '조은경',
      // 2개월 순수
      '손지원', '김동현', '이민지', '박형준', '김나영', '이성민', '정주영', '조민석'
    ],
    newActive: [
      '김배태', '박예진', '최지후', '김대우', '이예진', '박시원' // 전월 미가동→가동 전환
    ],
    newCommissioned: [
      '정민준', '조상원' // 당월 신규 위촉 (새로 입사한 설계사)
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
        name: '이지은', agentCode: 'AG001', experience: '8.5년차', commissionMonth: '102개월',
        currentMonth: { premium: 208, contracts: 13, rank: 1 },
        previousMonth: { premium: 186, contracts: 11, rank: 2 },
        threeMonthAverage: { premium: 195, contracts: 12 },
        productMix: { health: 70, life: 30 }, isActive: true
      },
      {
        name: '김선호', agentCode: 'AG002', experience: '6.2년차', commissionMonth: '74개월',
        currentMonth: { premium: 186, contracts: 12, rank: 2 },
        previousMonth: { premium: 192, contracts: 13, rank: 1 },
        threeMonthAverage: { premium: 189, contracts: 12 },
        productMix: { health: 55, life: 45 }, isActive: true
      },
      {
        name: '김준영', agentCode: 'AG003', experience: '12.8년차', commissionMonth: '153개월',
        currentMonth: { premium: 172, contracts: 11, rank: 3 },
        previousMonth: { premium: 164, contracts: 10, rank: 3 },
        threeMonthAverage: { premium: 168, contracts: 10 },
        productMix: { health: 65, life: 35 }, isActive: true
      },
      {
        name: '이하늘', agentCode: 'AG004', experience: '4.3년차', commissionMonth: '51개월',
        currentMonth: { premium: 158, contracts: 9, rank: 4 },
        previousMonth: { premium: 152, contracts: 8, rank: 4 },
        threeMonthAverage: { premium: 155, contracts: 8 },
        productMix: { health: 40, life: 60 }, isActive: true
      },
      {
        name: '박상호', agentCode: 'AG005', experience: '7.6년차', commissionMonth: '91개월',
        currentMonth: { premium: 145, contracts: 10, rank: 5 },
        previousMonth: { premium: 139, contracts: 9, rank: 5 },
        threeMonthAverage: { premium: 142, contracts: 9 },
        productMix: { health: 80, life: 20 }, isActive: true
      },

      // 6-12위: 연속 가동 설계사
      {
        name: '정미선', agentCode: 'AG006', experience: '5.4년차', commissionMonth: '65개월',
        currentMonth: { premium: 132, contracts: 8, rank: 6 },
        previousMonth: { premium: 125, contracts: 7, rank: 6 },
        threeMonthAverage: { premium: 128, contracts: 7 },
        productMix: { health: 55, life: 45 }, isActive: true
      },
      {
        name: '조영수', agentCode: 'AG007', experience: '3.7년차', commissionMonth: '44개월',
        currentMonth: { premium: 118, contracts: 7, rank: 7 },
        previousMonth: { premium: 114, contracts: 6, rank: 7 },
        threeMonthAverage: { premium: 116, contracts: 6 },
        productMix: { health: 75, life: 25 }, isActive: true
      },
      {
        name: '차서영', agentCode: 'AG008', experience: '10.2년차', commissionMonth: '122개월',
        currentMonth: { premium: 105, contracts: 6, rank: 8 },
        previousMonth: { premium: 98, contracts: 5, rank: 8 },
        threeMonthAverage: { premium: 101, contracts: 5 },
        productMix: { health: 60, life: 40 }, isActive: true
      },
      {
        name: '손민준', agentCode: 'AG009', experience: '2.9년차', commissionMonth: '35개월',
        currentMonth: { premium: 92, contracts: 5, rank: 9 },
        previousMonth: { premium: 87, contracts: 4, rank: 9 },
        threeMonthAverage: { premium: 89, contracts: 4 },
        productMix: { health: 45, life: 55 }, isActive: true
      },
      {
        name: '박지수', agentCode: 'AG010', experience: '6.8년차', commissionMonth: '81개월',
        currentMonth: { premium: 84, contracts: 4, rank: 10 },
        previousMonth: { premium: 79, contracts: 3, rank: 10 },
        threeMonthAverage: { premium: 81, contracts: 3 },
        productMix: { health: 85, life: 15 }, isActive: true
      },
      {
        name: '정동현', agentCode: 'AG011', experience: '4.5년차', commissionMonth: '54개월',
        currentMonth: { premium: 76, contracts: 3, rank: 11 },
        previousMonth: { premium: 72, contracts: 2, rank: 11 },
        threeMonthAverage: { premium: 74, contracts: 2 },
        productMix: { health: 50, life: 50 }, isActive: true
      },
      {
        name: '차민정', agentCode: 'AG012', experience: '1.8년차', commissionMonth: '21개월',
        currentMonth: { premium: 68, contracts: 2, rank: 12 },
        previousMonth: { premium: 65, contracts: 2, rank: 12 },
        threeMonthAverage: { premium: 66, contracts: 2 },
        productMix: { health: 70, life: 30 }, isActive: true
      },

      // 13-20위: 연속 가동 설계사 (3개월)
      {
        name: '김배태', agentCode: 'AG013', experience: '4.1년차', commissionMonth: '1개월',
        currentMonth: { premium: 61, contracts: 2, rank: 13 },
        previousMonth: { premium: 0, contracts: 0, rank: null },
        threeMonthAverage: { premium: 59, contracts: 1 },
        productMix: { health: 65, life: 35 }, isActive: true
      },
      {
        name: '박예진', agentCode: 'AG014', experience: '1.3년차', commissionMonth: '1개월',
        currentMonth: { premium: 54, contracts: 1, rank: 14 },
        previousMonth: { premium: 0, contracts: 0, rank: null },
        threeMonthAverage: { premium: 53, contracts: 1 },
        productMix: { health: 55, life: 45 }, isActive: true
      },
      {
        name: '박지영', agentCode: 'AG015', experience: '3.2년차', commissionMonth: '38개월',
        currentMonth: { premium: 48, contracts: 1, rank: 15 },
        previousMonth: { premium: 45, contracts: 1, rank: 15 },
        threeMonthAverage: { premium: 46, contracts: 1 },
        productMix: { health: 80, life: 20 }, isActive: true
      },
      {
        name: '정예린', agentCode: 'AG016', experience: '5.7년차', commissionMonth: '68개월',
        currentMonth: { premium: 42, contracts: 1, rank: 16 },
        previousMonth: { premium: 39, contracts: 1, rank: 16 },
        threeMonthAverage: { premium: 40, contracts: 1 },
        productMix: { health: 40, life: 60 }, isActive: true
      },
      {
        name: '조은경', agentCode: 'AG017', experience: '2.5년차', commissionMonth: '30개월',
        currentMonth: { premium: 36, contracts: 1, rank: 17 },
        previousMonth: { premium: 34, contracts: 1, rank: 17 },
        threeMonthAverage: { premium: 35, contracts: 1 },
        productMix: { health: 75, life: 25 }, isActive: true
      },
      {
        name: '손지원', agentCode: 'AG018', experience: '4.1년차', commissionMonth: '49개월',
        currentMonth: { premium: 31, contracts: 1, rank: 18 },
        previousMonth: { premium: 28, contracts: 1, rank: 18 },
        threeMonthAverage: { premium: 29, contracts: 1 },
        productMix: { health: 60, life: 40 }, isActive: true
      },
      {
        name: '김동현', agentCode: 'AG019', experience: '7.3년차', commissionMonth: '87개월',
        currentMonth: { premium: 26, contracts: 1, rank: 19 },
        previousMonth: { premium: 24, contracts: 1, rank: 19 },
        threeMonthAverage: { premium: 25, contracts: 1 },
        productMix: { health: 50, life: 50 }, isActive: true
      },
      {
        name: '이민지', agentCode: 'AG020', experience: '1.9년차', commissionMonth: '23개월',
        currentMonth: { premium: 22, contracts: 1, rank: 20 },
        previousMonth: { premium: 20, contracts: 1, rank: 20 },
        threeMonthAverage: { premium: 21, contracts: 1 },
        productMix: { health: 85, life: 15 }, isActive: true
      },

      // 21-25위: 연속 가동 설계사 (2개월)
      {
        name: '박형준', agentCode: 'AG021', experience: '6.5년차', commissionMonth: '78개월',
        currentMonth: { premium: 18, contracts: 1, rank: 21 },
        previousMonth: { premium: 16, contracts: 1, rank: 21 },
        threeMonthAverage: { premium: 17, contracts: 1 },
        productMix: { health: 45, life: 55 }, isActive: true
      },
      {
        name: '김나영', agentCode: 'AG022', experience: '3.8년차', commissionMonth: '45개월',
        currentMonth: { premium: 15, contracts: 1, rank: 22 },
        previousMonth: { premium: 13, contracts: 1, rank: 22 },
        threeMonthAverage: { premium: 14, contracts: 1 },
        productMix: { health: 70, life: 30 }, isActive: true
      },
      {
        name: '이성민', agentCode: 'AG023', experience: '8.1년차', commissionMonth: '97개월',
        currentMonth: { premium: 12, contracts: 1, rank: 23 },
        previousMonth: { premium: 10, contracts: 1, rank: 23 },
        threeMonthAverage: { premium: 11, contracts: 1 },
        productMix: { health: 55, life: 45 }, isActive: true
      },
      {
        name: '정주영', agentCode: 'AG024', experience: '2.3년차', commissionMonth: '27개월',
        currentMonth: { premium: 0, contracts: 0, rank: null }, // 당월 무실적
        previousMonth: { premium: 8, contracts: 1, rank: 24 },
        threeMonthAverage: { premium: 8, contracts: 1 },
        productMix: { health: 80, life: 20 }, isActive: true
      },
      {
        name: '조민석', agentCode: 'AG025', experience: '5.2년차', commissionMonth: '62개월',
        currentMonth: { premium: 0, contracts: 0, rank: null }, // 당월 무실적
        previousMonth: { premium: 6, contracts: 1, rank: 25 },
        threeMonthAverage: { premium: 6, contracts: 1 },
        productMix: { health: 65, life: 35 }, isActive: true
      },

      // 26-29위: 신규 가동 (당월 처음 실적)
      {
        name: '최지후', agentCode: 'AG026', experience: '1.5년차', commissionMonth: '18개월',
        currentMonth: { premium: 5, contracts: 1, rank: 26 },
        previousMonth: { premium: 0, contracts: 0, rank: null },
        threeMonthAverage: { premium: 2, contracts: 0 },
        productMix: { health: 40, life: 60 }, isActive: true
      },
      {
        name: '김대우', agentCode: 'AG027', experience: '4.7년차', commissionMonth: '56개월',
        currentMonth: { premium: 4, contracts: 1, rank: 27 },
        previousMonth: { premium: 0, contracts: 0, rank: null },
        threeMonthAverage: { premium: 2, contracts: 0 },
        productMix: { health: 75, life: 25 }, isActive: true
      },
      {
        name: '이예진', agentCode: 'AG028', experience: '7.9년차', commissionMonth: '94개월',
        currentMonth: { premium: 3, contracts: 1, rank: 28 },
        previousMonth: { premium: 0, contracts: 0, rank: null },
        threeMonthAverage: { premium: 1, contracts: 0 },
        productMix: { health: 60, life: 40 }, isActive: true
      },
      {
        name: '박시원', agentCode: 'AG029', experience: '3.4년차', commissionMonth: '41개월',
        currentMonth: { premium: 2, contracts: 1, rank: 29 },
        previousMonth: { premium: 0, contracts: 0, rank: null },
        threeMonthAverage: { premium: 1, contracts: 0 },
        productMix: { health: 50, life: 50 }, isActive: true
      },

      // 30-31위: 신규 위촉 (당월 입사, 실적 있음)
      {
        name: '정민준', agentCode: 'AG030', experience: '9.2년차', commissionMonth: '110개월',
        currentMonth: { premium: 1, contracts: 1, rank: 30 },
        previousMonth: { premium: 0, contracts: 0, rank: null },
        threeMonthAverage: { premium: 0, contracts: 0 },
        productMix: { health: 85, life: 15 }, isActive: true
      },
      {
        name: '조상원', agentCode: 'AG031', experience: '5.9년차', commissionMonth: '70개월',
        currentMonth: { premium: 1, contracts: 1, rank: 31 },
        previousMonth: { premium: 0, contracts: 0, rank: null },
        threeMonthAverage: { premium: 0, contracts: 0 },
        productMix: { health: 45, life: 55 }, isActive: true
      },

      // 32-35위: 전월 가동→미가동 전환
      {
        name: '윤서연', agentCode: 'AG032', experience: '11.3년차', commissionMonth: '135개월',
        currentMonth: { premium: 0, contracts: 0, rank: null },
        previousMonth: { premium: 45, contracts: 2, rank: 15 },
        threeMonthAverage: { premium: 22, contracts: 1 },
        productMix: { health: 70, life: 30 }, isActive: false
      },
      {
        name: '장민호', agentCode: 'AG033', experience: '4.4년차', commissionMonth: '52개월',
        currentMonth: { premium: 0, contracts: 0, rank: null },
        previousMonth: { premium: 38, contracts: 2, rank: 18 },
        threeMonthAverage: { premium: 19, contracts: 1 },
        productMix: { health: 55, life: 45 }, isActive: false
      },
      {
        name: '강예슬', agentCode: 'AG034', experience: '6.7년차', commissionMonth: '80개월',
        currentMonth: { premium: 0, contracts: 0, rank: null },
        previousMonth: { premium: 32, contracts: 1, rank: 20 },
        threeMonthAverage: { premium: 16, contracts: 0 },
        productMix: { health: 80, life: 20 }, isActive: false
      },
      {
        name: '오준혁', agentCode: 'AG035', experience: '2.1년차', commissionMonth: '25개월',
        currentMonth: { premium: 0, contracts: 0, rank: null },
        previousMonth: { premium: 28, contracts: 1, rank: 22 },
        threeMonthAverage: { premium: 14, contracts: 0 },
        productMix: { health: 40, life: 60 }, isActive: false
      },

      // 36-47위: 미가동 설계사
      { name: '김스우', agentCode: 'AG036', experience: '7.4년차', commissionMonth: '88개월', currentMonth: { premium: 0, contracts: 0, rank: null }, previousMonth: { premium: 85, contracts: 3, rank: 25 }, threeMonthAverage: { premium: 28, contracts: 1 }, productMix: { health: 75, life: 25 }, isActive: false },
      { name: '이지인', agentCode: 'AG037', experience: '3.6년차', commissionMonth: '43개월', currentMonth: { premium: 0, contracts: 0, rank: null }, previousMonth: { premium: 72, contracts: 2, rank: 28 }, threeMonthAverage: { premium: 24, contracts: 1 }, productMix: { health: 60, life: 40 }, isActive: false },
      { name: '박성민', agentCode: 'AG038', experience: '5.1년차', commissionMonth: '61개월', currentMonth: { premium: 0, contracts: 0, rank: null }, previousMonth: { premium: 91, contracts: 4, rank: 22 }, threeMonthAverage: { premium: 30, contracts: 1 }, productMix: { health: 50, life: 50 }, isActive: false },
      { name: '정선영', agentCode: 'AG039', experience: '8.7년차', commissionMonth: '104개월', currentMonth: { premium: 0, contracts: 0, rank: null }, previousMonth: { premium: 68, contracts: 2, rank: 31 }, threeMonthAverage: { premium: 23, contracts: 1 }, productMix: { health: 85, life: 15 }, isActive: false },
      { name: '조지우', agentCode: 'AG040', experience: '2.8년차', commissionMonth: '33개월', currentMonth: { premium: 0, contracts: 0, rank: null }, previousMonth: { premium: 0, contracts: 0, rank: null }, threeMonthAverage: { premium: 0, contracts: 0 }, productMix: { health: 45, life: 55 }, isActive: false },
      { name: '차예린', agentCode: 'AG041', experience: '6.3년차', commissionMonth: '75개월', currentMonth: { premium: 0, contracts: 0, rank: null }, previousMonth: { premium: 0, contracts: 0, rank: null }, threeMonthAverage: { premium: 0, contracts: 0 }, productMix: { health: 70, life: 30 }, isActive: false },
      { name: '손이상', agentCode: 'AG042', experience: '1.7년차', commissionMonth: '20개월', currentMonth: { premium: 0, contracts: 0, rank: null }, previousMonth: { premium: 0, contracts: 0, rank: null }, threeMonthAverage: { premium: 0, contracts: 0 }, productMix: { health: 55, life: 45 }, isActive: false },
      { name: '김은영', agentCode: 'AG043', experience: '4.9년차', commissionMonth: '58개월', currentMonth: { premium: 0, contracts: 0, rank: null }, previousMonth: { premium: 0, contracts: 0, rank: null }, threeMonthAverage: { premium: 0, contracts: 0 }, productMix: { health: 80, life: 20 }, isActive: false },
      { name: '이승찬', agentCode: 'AG044', experience: '10.5년차', commissionMonth: '126개월', currentMonth: { premium: 0, contracts: 0, rank: null }, previousMonth: { premium: 0, contracts: 0, rank: null }, threeMonthAverage: { premium: 0, contracts: 0 }, productMix: { health: 40, life: 60 }, isActive: false },
      { name: '박서우', agentCode: 'AG045', experience: '3.1년차', commissionMonth: '37개월', currentMonth: { premium: 0, contracts: 0, rank: null }, previousMonth: { premium: 0, contracts: 0, rank: null }, threeMonthAverage: { premium: 0, contracts: 0 }, productMix: { health: 75, life: 25 }, isActive: false },
      { name: '정민규', agentCode: 'AG046', experience: '7.8년차', commissionMonth: '93개월', currentMonth: { premium: 0, contracts: 0, rank: null }, previousMonth: { premium: 0, contracts: 0, rank: null }, threeMonthAverage: { premium: 0, contracts: 0 }, productMix: { health: 60, life: 40 }, isActive: false },
      { name: '조예림', agentCode: 'AG047', experience: '5.6년차', commissionMonth: '67개월', currentMonth: { premium: 0, contracts: 0, rank: null }, previousMonth: { premium: 0, contracts: 0, rank: null }, threeMonthAverage: { premium: 0, contracts: 0 }, productMix: { health: 50, life: 50 }, isActive: false }
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
        // topAgentSortOrder에 따라 정렬 방향 결정
        return topAgentSortOrder === 'desc' ? bValue - aValue : aValue - bValue;
      }
      
      // 전체 리스트에서는 기존 정렬 방식 사용
      switch (agentSortBy) {
        case 'index':
          // 번호는 배열 순서로 정렬 (1부터 시작하는 인덱스)
          aValue = agentList.indexOf(a) + 1;
          bValue = agentList.indexOf(b) + 1;
          break;
        case 'agentCode':
          // 설계사 코드는 문자열 비교
          return agentSortOrder === 'desc'
            ? b.agentCode.localeCompare(a.agentCode)
            : a.agentCode.localeCompare(b.agentCode);
        case 'name':
          // 이름은 문자열 비교
          return agentSortOrder === 'desc'
            ? b.name.localeCompare(a.name)
            : a.name.localeCompare(b.name);
        case 'experience':
          // 경력은 숫자로 변환해서 비교 ("8년차" -> 8)
          aValue = parseInt(a.experience?.replace('년차', '') || '0');
          bValue = parseInt(b.experience?.replace('년차', '') || '0');
          break;
        case 'commissionMonth':
          // 위촉월차는 숫자로 변환해서 비교 ("96개월" -> 96)
          aValue = parseInt(a.commissionMonth?.replace('개월', '') || '0');
          bValue = parseInt(b.commissionMonth?.replace('개월', '') || '0');
          break;
        case 'mmp':
          // 미가동 설계사는 0으로 처리
          aValue = a.isActive ? a.currentMonth.premium : 0;
          bValue = b.isActive ? b.currentMonth.premium : 0;
          break;
        case 'prevMmp':
          aValue = a.previousMonth.premium || 0;
          bValue = b.previousMonth.premium || 0;
          break;
        case 'avgMmp':
          aValue = a.threeMonthAverage.premium || 0;
          bValue = b.threeMonthAverage.premium || 0;
          break;
        case 'currentContracts':
          aValue = a.currentMonth.contracts || 0;
          bValue = b.currentMonth.contracts || 0;
          break;
        case 'prevContracts':
          aValue = a.previousMonth.contracts || 0;
          bValue = b.previousMonth.contracts || 0;
          break;
        case 'currentActive':
          aValue = (a.isActive && a.currentMonth.premium > 0) ? 1 : 0;
          bValue = (b.isActive && b.currentMonth.premium > 0) ? 1 : 0;
          break;
        case 'previousActive':
          aValue = a.previousMonth.premium > 0 ? 1 : 0;
          bValue = b.previousMonth.premium > 0 ? 1 : 0;
          break;
        case 'mmp0':
          aValue = a.currentMonth.premium || 0;
          bValue = b.currentMonth.premium || 0;
          break;
        case 'mmp1':
          aValue = a.previousMonth.premium || 0;
          bValue = b.previousMonth.premium || 0;
          break;
        case 'mmp2':
        case 'mmp3':
          aValue = Math.floor(Math.random() * 100) + 20;
          bValue = Math.floor(Math.random() * 100) + 20;
          break;
        case 'contract0':
          aValue = a.currentMonth.contracts || 0;
          bValue = b.currentMonth.contracts || 0;
          break;
        case 'contract1':
          aValue = a.previousMonth.contracts || 0;
          bValue = b.previousMonth.contracts || 0;
          break;
        case 'contract2':
        case 'contract3':
          aValue = Math.floor(Math.random() * 10) + 1;
          bValue = Math.floor(Math.random() * 10) + 1;
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
    setShowAllAgentsModal(true);
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
    downloadCSV();
  };

  return (
    <>
      <div className="min-h-screen bg-gray-50 flex flex-col">

      {/* Header */}
      <div className="bg-white border-b">
        {/* 타이틀 및 현재 정보 표시 영역 */}
        <div className="px-6 py-4 border-b border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-xl font-bold text-gray-900 mb-1">지점 360° 상세 뷰</h1>
              <div className="flex items-center text-sm text-gray-600">
                <span className="font-medium">{selectedAgency} &gt; {selectedBranch}</span>
                <span className="ml-3 text-gray-500">
                  {selectedPeriod === '2025-09'
                    ? '2025.09.19 마감 기준'
                    : `${selectedPeriod.split('-')[0]}.${selectedPeriod.split('-')[1]} 마감일 기준`
                  }
                </span>
              </div>
              {/* 방문 추천 태그 표시 */}
              {(() => {
                const alerts = getBranchAlerts(selectedAgency, selectedBranch);
                if (alerts.length === 0) return null;

                // 알림을 타입별로 그룹화
                const alertsByType = alerts.reduce((acc, alert) => {
                  if (!acc[alert.type]) acc[alert.type] = [];
                  acc[alert.type].push(alert);
                  return acc;
                }, {} as Record<string, typeof alerts>);

                return (
                  <div className="mt-3 flex flex-wrap gap-2">
                    {alertsByType['위험'] && alertsByType['위험'].map((alert, idx) => (
                      <span
                        key={`risk-${idx}`}
                        className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-red-100 text-red-800"
                      >
                        <span className="mr-1">🔴</span> {alert.title}
                      </span>
                    ))}
                    {alertsByType['기회'] && alertsByType['기회'].map((alert, idx) => (
                      <span
                        key={`opportunity-${idx}`}
                        className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800"
                      >
                        <span className="mr-1">🟢</span> {alert.title}
                      </span>
                    ))}
                    {alertsByType['변화'] && alertsByType['변화'].map((alert, idx) => (
                      <span
                        key={`change-${idx}`}
                        className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800"
                      >
                        <span className="mr-1">🔵</span> {alert.title}
                      </span>
                    ))}
                  </div>
                );
              })()}
            </div>
            <div className="text-right">
              <div className="text-sm text-gray-500">2025.09.20(금)</div>
              <div className="text-xs text-gray-400 mt-1">9월 영업일: 15일/22일 (잔여 7일)</div>
            </div>
          </div>
        </div>

        {/* 조회 조건 및 액션 영역 */}
        <div className="px-6 py-3 bg-gray-50">
          <div className="flex items-center justify-between">
            {/* 조회 조건 그룹 */}
            <div className="flex items-center space-x-6">
              {/* 대리점/지점 선택 */}
              <div className="flex items-center space-x-3">
                <span className="text-sm font-medium text-gray-700 min-w-0">조회 대상</span>
                <div className="flex items-center space-x-2">
                  <div className="relative">
                    <button
                      onClick={() => setShowAgencyDropdown(!showAgencyDropdown)}
                      className="flex items-center space-x-2 px-3 py-2 bg-white border border-gray-300 rounded-lg text-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 min-w-32"
                    >
                      <span className="truncate">{tempSelectedAgency}</span>
                      <ChevronDown className="w-4 h-4 text-gray-500 flex-shrink-0" />
                    </button>
                    {showAgencyDropdown && (
                      <div className="absolute top-full left-0 mt-1 w-64 bg-white border border-gray-200 rounded-lg shadow-lg z-50 max-h-60 overflow-y-auto">
                        {agencies.map((agency) => (
                          <button
                            key={agency}
                            onClick={() => handleAgencyChange(agency)}
                            className={`w-full px-4 py-2 text-left text-sm hover:bg-gray-50 ${
                              agency === tempSelectedAgency ? 'bg-blue-50 text-blue-700 font-medium' : 'text-gray-700'
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
                      className="flex items-center space-x-2 px-3 py-2 bg-white border border-gray-300 rounded-lg text-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 min-w-32"
                    >
                      <span className="truncate">{tempSelectedBranch}</span>
                      <ChevronDown className="w-4 h-4 text-gray-500 flex-shrink-0" />
                    </button>
                    {showBranchDropdown && (
                      <div className="absolute top-full left-0 mt-1 w-64 bg-white border border-gray-200 rounded-lg shadow-lg z-50 max-h-60 overflow-y-auto">
                        {availableBranches.map((branch) => (
                          <button
                            key={branch}
                            onClick={() => handleBranchChange(branch)}
                            className={`w-full px-4 py-2 text-left text-sm hover:bg-gray-50 ${
                              branch === tempSelectedBranch ? 'bg-blue-50 text-blue-700 font-medium' : 'text-gray-700'
                            }`}
                          >
                            {branch}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* 조회년월 선택 */}
              <div className="flex items-center space-x-3">
                <span className="text-sm font-medium text-gray-700 min-w-0">조회년월</span>
                <select
                  value={tempSelectedPeriod}
                  onChange={(e) => setTempSelectedPeriod(e.target.value)}
                  className="px-3 py-2 bg-white border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 min-w-32"
                >
                  {monthOptions.map(option => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* 액션 버튼 그룹 */}
            <div className="flex items-center space-x-3">
              <button
                onClick={handleSearch}
                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-lg flex items-center space-x-2 transition-colors"
              >
                <Search className="w-4 h-4" />
                <span>조회</span>
              </button>

              <button
                onClick={handleExcelDownload}
                className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white text-sm font-medium rounded-lg flex items-center space-x-2 transition-colors"
              >
                <Download className="w-4 h-4" />
                <span>원클릭 엑셀 다운로드</span>
              </button>
            </div>
          </div>
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
            </div>

            {/* APE 실적 현황 - 심플 버전 */}
            <div className="bg-white rounded-lg shadow-sm border p-6 relative">
              <div className="flex justify-between items-start mb-4 border-b border-gray-100 pb-2">
                <h3 className="text-base font-bold text-gray-800">목표달성률</h3>
                <span className="text-xs text-gray-500">APE 기준</span>
              </div>

              <div className="text-center mb-4">
                <div className="text-5xl font-black text-blue-600 mb-2">{corePerformance.achievementRate.toFixed(1)}%</div>
                <div className="text-sm text-gray-600 font-medium mb-4">
                  달성 {formatCurrency(corePerformance.currentApe * 10000)} / 목표 {formatCurrency(corePerformance.targetApe * 10000)}
                </div>

                <div className="w-full bg-gray-200 rounded-full h-5 mb-2 relative">
                  <div className="bg-blue-500 h-5 rounded-full transition-all" style={{width: `${corePerformance.achievementRate}%`}}></div>
                  {/* 목표 진도율선 (15일/22일 = 68.2%) */}
                  <div
                    className="absolute top-0 h-5 w-0.5 bg-orange-500 z-10 cursor-pointer"
                    style={{left: `${(15/22)*100}%`}}
                    onMouseEnter={() => setShowExpectedProgressTooltip(true)}
                    onMouseLeave={() => setShowExpectedProgressTooltip(false)}
                  />
                  {/* 목표 진도율 삼각형 표시 */}
                  <div
                    className="absolute -bottom-3 z-10"
                    style={{left: `${(15/22)*100}%`, transform: 'translateX(-50%)'}}
                  >
                    <div
                      className="w-0 h-0"
                      style={{
                        borderLeft: '6px solid transparent',
                        borderRight: '6px solid transparent',
                        borderBottom: '8px solid #f97316'
                      }}
                    ></div>
                  </div>
                  {/* 목표 진도율 호버 영역 확대 */}
                  <div
                    className="absolute -bottom-3 h-7 w-6 z-10 cursor-pointer"
                    style={{left: `${(15/22)*100}%`, transform: 'translateX(-50%)'}}
                    onMouseEnter={() => setShowExpectedProgressTooltip(true)}
                    onMouseLeave={() => setShowExpectedProgressTooltip(false)}
                  />
                  {/* 목표 진도율 툴팁 */}
                  {showExpectedProgressTooltip && (
                    <div
                      className="absolute top-6 bg-gray-800 text-white text-xs rounded px-3 py-2 whitespace-nowrap z-20 shadow-lg"
                      style={{left: `${(15/22)*100}%`, transform: 'translateX(-50%)'}}
                    >
                      <div className="font-bold mb-1">목표 진도율 {Math.round((15/22)*100)}%</div>
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
                    <div className="bg-white rounded-lg p-3 text-center border border-blue-200 relative group cursor-help">
                      <div className="text-xs text-gray-500 mb-2">목표 담당률</div>
                      <div className="text-2xl font-bold text-blue-600 mb-1">{corePerformance.managerPlanContribution}%</div>
                      <div className="text-xs text-blue-600">{formatCurrency(corePerformance.branchTargetApe * 10000)} / {formatCurrency(corePerformance.managerPersonalTarget * 10000)}</div>

                      {/* 툴팁 */}
                      <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 bg-gray-800 text-white text-xs rounded px-2 py-1 whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-30">
                        지점 목표: {formatCurrency(corePerformance.branchTargetApe * 10000)} / 개인 목표: {formatCurrency(corePerformance.managerPersonalTarget * 10000)}
                        <div className="absolute top-full left-1/2 transform -translate-x-1/2 border-4 border-transparent border-t-gray-800"></div>
                      </div>
                    </div>
                    <div className="bg-white rounded-lg p-3 text-center border border-green-200 relative group cursor-help">
                      <div className="text-xs text-gray-500 mb-2">달성 기여율</div>
                      <div className="text-2xl font-bold text-green-600 mb-1">{corePerformance.managerContributionRate}%</div>
                      <div className="text-xs text-green-600">{formatCurrency(corePerformance.currentApe * 10000)} / {formatCurrency(corePerformance.managerApe * 10000)}</div>

                      {/* 툴팁 */}
                      <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 bg-gray-800 text-white text-xs rounded px-2 py-1 whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-30">
                        지점 실적: {formatCurrency(corePerformance.currentApe * 10000)} / 개인 실적: {formatCurrency(corePerformance.managerApe * 10000)}
                        <div className="absolute top-full left-1/2 transform -translate-x-1/2 border-4 border-transparent border-t-gray-800"></div>
                      </div>
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
                <h3 className="text-sm font-semibold text-gray-700">{getCurrentMonth()}월 일별 실적</h3>
                
                <div className="text-right space-y-1">
                  {/* 지표 선택 */}
                  <div className="flex bg-gray-100 rounded-lg p-1">
                    {['APE', '청약 건수'].map(metric => (
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
                    const values = dailyMetric === 'APE' 
                      ? currentData.map(d => d.apeAmount) 
                      : currentData.map(d => d.contractCount);
                    const average = values.reduce((sum, val) => sum + val, 0) / values.length;
                    return dailyMetric === 'APE' 
                      ? `${average.toFixed(0)}만원`
                      : `${average.toFixed(1)}건`;
                  })()} 
                </div>
                {/* 평균선 */}
                <svg className="absolute inset-4 w-[calc(100%-2rem)] h-[calc(100%-2rem)]" viewBox="0 0 100 100" preserveAspectRatio="none" style={{zIndex: 1, pointerEvents: 'none'}}>
                  {(() => {
                    const currentData = dailyPerformance.filter(d => !d.isWeekend);
                    const values = dailyMetric === 'APE' 
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
                    평균: {dailyMetric === 'APE' 
                      ? `${formatCurrency(hoveredAverage.value * 10000)}`
                      : `${hoveredAverage.value.toFixed(1)}건`
                    }
                  </div>
                )}
                
                {/* 막대 그래프 */}
                <div className="flex items-end justify-center gap-1 h-full relative" style={{paddingTop: '20px'}}>
                  {dailyPerformance.map((data, i) => {
                    const currentValue = dailyMetric === 'APE' ? data.apeAmount : data.contractCount;
                    const maxValue = dailyMetric === 'APE'
                      ? Math.max(...dailyPerformance.filter(d => !d.isWeekend).map(d => d.apeAmount))
                      : Math.max(...dailyPerformance.filter(d => !d.isWeekend).map(d => d.contractCount));

                    // 주말이면 막대 높이를 0으로, 평일이면 정상 계산
                    const barHeight = data.isWeekend ? 0 : (currentValue === 0 ? 2 : (currentValue / maxValue) * 120);
                    const healthHeight = data.isWeekend ? 0 : (barHeight * data.healthRatio) / 100;
                    const lifeHeight = data.isWeekend ? 0 : (barHeight * data.lifeRatio) / 100;
                    
                    return (
                      <div key={data.day} className="flex flex-col items-center relative" style={{width: '8px'}}>
                        {/* 막대 그래프 - 건강(파란색) + 종신(초록색) */}
                        <div
                          className={`w-full rounded transition-opacity relative ${data.isWeekend ? '' : 'cursor-pointer hover:opacity-80'}`}
                          style={{height: `${barHeight}px`}}
                          onMouseEnter={() => !data.isWeekend && setHoveredDayData({...data, idx: i})}
                        >
                          {/* 건강보험 (하단) - 주말이면 표시하지 않음 */}
                          {!data.isWeekend && (
                            <div
                              className="w-full bg-blue-500 rounded-b"
                              style={{height: `${healthHeight}px`, position: 'absolute', bottom: 0}}
                            />
                          )}
                          {/* 종신/정기 (상단) - 주말이면 표시하지 않음 */}
                          {!data.isWeekend && (
                            <div
                              className="w-full bg-green-500 rounded-t"
                              style={{height: `${lifeHeight}px`, position: 'absolute', top: 0}}
                            />
                          )}
                        </div>

                        {/* 일자 - 주말은 회색으로 표시 */}
                        <div className={`text-xs mt-1 ${data.isWeekend ? 'text-gray-300' : 'text-gray-500'}`}>
                          {(() => {
                            const day = parseInt(data.day);
                            const isLastDay = i === dailyPerformance.length - 1;
                            const shouldShowLabel = day === 1 || day === 15 || isLastDay;
                            const shouldShowEvery5th = day % 5 === 0;

                            if (shouldShowLabel) {
                              return data.day;
                            } else if (shouldShowEvery5th && day <= 30) {
                              return data.day;
                            } else {
                              return '\u00A0'; // 공백 문자로 높이 유지
                            }
                          })()}
                        </div>

                        {/* 툴팁 - 주말에는 표시하지 않음 */}
                        {!data.isWeekend && hoveredDayData && hoveredDayData.idx === i && (
                          <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 bg-gray-800 text-white text-xs rounded px-2 py-1 whitespace-nowrap z-20">
                            <div>9월 {data.day}일</div>
                            <div>{dailyMetric === 'APE' ? `APE: ${formatCurrency(data.apeAmount * 10000)}` : `청약: ${data.contractCount}건`}</div>
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
                <h3 className="text-sm font-semibold text-gray-700">{getCurrentYear()}년 월별 실적</h3>
                
                <div className="text-right space-y-1">
                  {/* 지표 선택 */}
                  <div className="flex bg-gray-100 rounded-lg p-1">
                    {['APE', '청약 건수'].map(metric => (
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
                </div>
              </div>
              
              <div className="h-52 relative bg-gray-50 rounded-lg p-4" onMouseLeave={() => setHoveredMonthData(null)}>
                {/* 평균값 라벨 */}
                <div className="absolute top-2 right-2 text-xs text-gray-600 flex items-center gap-1">
                  <div className="w-3 h-0.5 bg-yellow-400" style={{width: '12px'}}></div>
                  월 평균(당월 제외): {(() => {
                    const selectedPeriodYear = selectedPeriod.split('-')[0];
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
                    const currentData = selectedMetric === 'APE' ? yearData[selectedPeriodYear] : contractData[selectedPeriodYear];
                    const average = currentData.reduce((sum, val) => sum + val, 0) / currentData.length;
                    return selectedMetric === 'APE'
                      ? `${average.toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ',')}만원`
                      : `${average.toFixed(0)}건`;
                  })()} 
                </div>
                {/* 평균선 */}
                <svg className="absolute inset-4 w-[calc(100%-2rem)] h-[calc(100%-2rem)]" viewBox="0 0 100 100" preserveAspectRatio="none" style={{zIndex: 1, pointerEvents: 'none'}}>
                  {(() => {
                    const selectedPeriodYear = selectedPeriod.split('-')[0];
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

                    const currentData = selectedMetric === 'APE' ? yearData[selectedPeriodYear] : contractData[selectedPeriodYear];
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
                    평균: {selectedMetric === 'APE'
                      ? `${formatCurrency(hoveredAverage.value * 10000)}`
                      : `${hoveredAverage.value.toFixed(1)}건`
                    }
                  </div>
                )}
                
                {/* 막대 그래프 */}
                <div className="flex items-end justify-center gap-1 h-full relative" style={{paddingTop: '20px'}}>
                  {(() => {
                    // 고정된 데이터 사용 (연도와 지표별로)
                    const selectedPeriodYear = selectedPeriod.split('-')[0];
                    const monthCount = getCurrentMonth();
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
                    
                    const apeValues = yearData[selectedPeriodYear as keyof typeof yearData];
                    const contractValues = contractData[selectedPeriodYear as keyof typeof contractData];
                    
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
                    
                    const maxValue = selectedMetric === 'APE'
                      ? Math.max(...currentMonthData.map(d => d.ape))
                      : Math.max(...currentMonthData.map(d => d.contracts));
                    
                    return currentMonthData.map((data, idx) => {
                      const value = selectedMetric === 'APE' ? data.ape : data.contracts;
                      const barHeight = Math.min((value / maxValue) * 120, 120);
                      const healthHeight = (barHeight * 65) / 100;
                      const lifeHeight = barHeight - healthHeight;
                      
                      
                      return (
                        <div key={idx} className="flex flex-col items-center relative" style={{
                          height: '160px', 
                          width: monthCount <= 9 ? '35px' : '25px'
                        }}>
                          {/* 차트 영역 */}
                          <div className="relative flex justify-center" style={{height: '120px', width: '100%'}}>
                            {/* 막대 */}
                            <div
                              className="w-4 rounded-t hover:opacity-80 transition-opacity cursor-pointer absolute bottom-0 overflow-hidden"
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
                              {selectedMetric === 'APE' ? (
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
                    {/* 기본: 당월만 표시 */}
                    {!showManagementHistoryModal && (
                      <tr className="hover:bg-gray-50">
                        <td className="py-2 text-xs font-medium text-gray-700">{managementHistory[0].month}</td>
                        <td className="py-2 text-center text-sm font-bold text-gray-900">{managementHistory[0].education.count === 0 ? '-' : managementHistory[0].education.count}</td>
                        <td className="py-2 text-center text-sm font-bold text-gray-900">{managementHistory[0].visit.count === 0 ? '-' : managementHistory[0].visit.count}</td>
                        <td className="py-2 text-center text-sm font-bold text-gray-900">{managementHistory[0].appPush.count === 0 ? '-' : managementHistory[0].appPush.count}</td>
                        <td className="py-2 text-center text-sm font-bold text-gray-900">{managementHistory[0].sms.count === 0 ? '-' : managementHistory[0].sms.count}</td>
                      </tr>
                    )}

                    {/* 펼침: 전체 6개월 표시 */}
                    {showManagementHistoryModal && managementHistory.map((month, idx) => (
                      <tr key={idx} className="hover:bg-gray-50">
                        <td className="py-2 text-xs font-medium text-gray-700">{month.month}</td>
                        <td className="py-2 text-center text-sm font-bold text-gray-900">{month.education.count === 0 ? '-' : month.education.count}</td>
                        <td className="py-2 text-center text-sm font-bold text-gray-900">{month.visit.count === 0 ? '-' : month.visit.count}</td>
                        <td className="py-2 text-center text-sm font-bold text-gray-900">{month.appPush.count === 0 ? '-' : month.appPush.count}</td>
                        <td className="py-2 text-center text-sm font-bold text-gray-900">{month.sms.count === 0 ? '-' : month.sms.count}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <div className="mt-3 text-center">
                  <button
                    onClick={() => setShowManagementHistoryModal(!showManagementHistoryModal)}
                    className="text-xs text-blue-600 hover:text-blue-800 font-medium transition-all flex items-center justify-center mx-auto"
                  >
                    {showManagementHistoryModal
                      ? (
                        <>
                          <span>접기</span>
                          <svg className="w-3 h-3 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
                          </svg>
                        </>
                      )
                      : (
                        <>
                          <span>더보기 ({managementHistory.length - 1}개월)</span>
                          <svg className="w-3 h-3 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                          </svg>
                        </>
                      )
                    }
                  </button>
                </div>
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

            {/* 고객 특성 */}
            <div>
              <div className="bg-white rounded-lg shadow-sm border p-4">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-sm font-semibold text-gray-700">고객 특성</h3>
                  <div className="text-xs text-gray-500">*직전 3개월 신계약 기준</div>
                </div>
                <div className="space-y-4">
                  {/* 연령대 */}
                  <div className="text-center">
                    <div className="text-2xl font-bold text-blue-600 mb-1">{metricsData['average'].customerAge}</div>
                    <div className="text-xs text-gray-500">평균 36.5세</div>
                  </div>

                  {/* 성별 분포 - 시각적 바 */}
                  <div className="border-t pt-3">
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

            {/* 계약 특성 */}
            <div>
              <div className="bg-white rounded-lg shadow-sm border p-4">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-sm font-semibold text-gray-700">계약 특성</h3>
                  <div className="text-xs text-gray-500">*직전 3개월 신계약 기준</div>
                </div>
                <div className="space-y-4">
                  {/* 평균 월납 보험료 & 평균 납입기간 */}
                  <div className="grid grid-cols-2 gap-4 divide-x divide-gray-200">
                    <div className="text-center">
                      <div className="text-xl font-bold text-green-600 mb-1">{metricsData['average'].averagePremium}</div>
                      <div className="text-xs text-gray-500">월 평균 보험료</div>
                    </div>
                    <div className="text-center">
                      <div className="text-xl font-bold text-purple-600 mb-1">22.3년</div>
                      <div className="text-xs text-gray-500">평균 납입기간</div>
                    </div>
                  </div>

                  {/* 주계약/특약 비율 */}
                  <div className="border-t pt-3">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs text-gray-600">주계약</span>
                      <span className="text-xs font-medium">62%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
                      <div className="bg-blue-500 h-2 rounded-full" style={{width: '62%'}}></div>
                    </div>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs text-gray-600">특약</span>
                      <span className="text-xs font-medium">38%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-orange-400 h-2 rounded-full" style={{width: '38%'}}></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* 주력 상품 */}
            <div className="bg-white rounded-lg shadow-sm border p-4">
              <div className="flex items-center justify-between mb-1">
                <h3 className="text-sm font-semibold text-gray-700">주력 상품</h3>
                <p className="text-xs text-gray-500">*직전 3개월 평균 기준</p>
              </div>

              {/* 상품군 필터 - 토글 버튼 스타일 */}
              <div className="flex justify-end mb-4 mt-3">
                <div className="flex bg-gray-100 rounded-lg p-1">
                  {['전체', '건강', '종신/정기'].map(product => (
                    <button
                      key={product}
                      onClick={() => setSelectedProduct(product as '전체' | '건강' | '종신/정기')}
                      className={`px-3 py-1 text-xs font-medium rounded transition-colors ${
                        selectedProduct === product
                          ? 'bg-white text-gray-900 shadow-sm'
                          : 'text-gray-600 hover:text-gray-900'
                      }`}
                    >
                      {product}
                    </button>
                  ))}
                </div>
              </div>

              {/* 포트폴리오 분석 */}
              <div className="mb-4">
                <div className="space-y-2">
                  {getPortfolioData().map((item, idx) => {
                    const apeAmountRaw = getFilteredData('ape') * item.value / 100; // 만원 단위

                    const formattedAmount = formatCurrency(apeAmountRaw * 10000);

                    return (
                      <div
                        key={idx}
                        className="flex items-center gap-3 mb-1 group relative"
                        title={`직전 3개월 평균 APE: ${formattedAmount}`}
                      >
                        <span className="text-xs text-gray-700 w-28 flex-shrink-0">{item.name}</span>
                        <div className="flex-1 bg-gray-200 rounded-full h-4 relative">
                          <div
                            className="h-4 rounded-full transition-all hover:opacity-80"
                            style={{ width: `${item.value}%`, backgroundColor: item.color }}
                          />
                          {/* 전체 평균선 */}
                          {selectedProduct === '전체' && (
                            <div
                              className="absolute top-0 bottom-0 w-0.5 bg-orange-500 z-10"
                              style={{
                                left: `${item.name === '건강' ? '60%' : '40%'}`,
                                boxShadow: '0 0 4px rgba(255, 165, 0, 0.5)'
                              }}
                              title={`전체 평균: ${item.name === '건강' ? '60%' : '40%'}`}
                            />
                          )}
                        </div>
                        <span className="text-xs font-medium text-gray-700 w-8 text-right flex-shrink-0">{item.value}%</span>

                        {/* 툴팁 */}
                        <div className="absolute left-1/2 -top-8 transform -translate-x-1/2 bg-gray-800 text-white text-xs rounded px-2 py-1 whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity z-10 pointer-events-none">
                          직전 3개월 평균 APE: {formattedAmount}
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* 범례 - 전체 상품군 선택시에만 표시 */}
                {selectedProduct === '전체' && (
                  <div className="mt-3 pt-2 border-t border-gray-100">
                    <div className="flex items-center justify-center gap-4 text-xs">
                      <div className="flex items-center">
                        <div className="w-4 h-0.5 bg-orange-500 mr-2"></div>
                        <span className="text-gray-600">전체 평균 (건강 60% / 종신정기 40%)</span>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Top 3 상품 - 테이블 형태 */}
              <div className="border-t pt-3">
                <div className="text-xs font-medium text-gray-700 mb-3">Top 3 상품</div>

                <div className="overflow-hidden">
                  {/* 헤더 */}
                  <div className="grid gap-2 pb-2 border-b border-gray-200 mb-3" style={{gridTemplateColumns: '30px 1fr 80px 80px'}}>
                    <div className="text-xs font-medium text-gray-500">순위</div>
                    <div className="text-xs font-medium text-gray-500">상품명</div>
                    <button
                      onClick={() => setProductSortBy(productSortBy === 'amount' ? 'count' : 'amount')}
                      className={`text-xs font-medium hover:text-blue-600 transition-colors text-left flex items-center gap-1 ${
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
                      className={`text-xs font-medium hover:text-blue-600 transition-colors text-left flex items-center gap-1 ${
                        productSortBy === 'count' ? 'text-blue-600 font-bold' : 'text-gray-900'
                      }`}
                    >
                      건수
                      {productSortBy === 'count' && (
                        <ArrowDown className="w-3 h-3" />
                      )}
                    </button>
                  </div>

                  {/* 데이터 행 */}
                  <div className="space-y-1">
                    {getTopProducts().map((product: any, idx: number) => (
                      <div
                        key={product.rank}
                        className="grid gap-2 p-2 rounded-lg"
                        style={{gridTemplateColumns: '30px 1fr 80px 80px'}}
                      >
                        <div className="flex items-center">
                          <div className={`w-4 h-4 rounded-full flex items-center justify-center text-xs font-bold ${
                            idx < 3 ? 'bg-yellow-400 text-yellow-900' : 'bg-gray-200 text-gray-600'
                          }`}>
                            {product.rank}
                          </div>
                        </div>
                        <div className="flex items-center min-w-0">
                          <div className="text-xs font-medium text-gray-900 truncate">
                            {product.name}
                          </div>
                        </div>
                        <div className="flex items-center">
                          <div className={`text-xs ${
                            productSortBy === 'amount' ? 'text-blue-600 font-bold' : 'text-gray-900'
                          }`}>{product.amount}</div>
                        </div>
                        <div className="flex items-center">
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

            {/* 우수 설계사 현황 */}
            <div className="bg-white rounded-lg shadow-sm border p-4">
              <h3 className="text-sm font-semibold text-gray-700 mb-4">당월 가동 설계사</h3>
              
              {/* 간략 현황 */}
              <div className="text-center mb-4 pb-4 border-b border-gray-200">
                <div className="text-2xl font-bold text-indigo-600">{(() => {
                  const allData = getSortedAgents(true);
                  const activeCount = allData.filter(agent => agent.currentMonth.premium > 0).length;
                  return activeCount;
                })()}<span className="text-sm text-gray-500">명</span></div>
                <div className="text-xs text-gray-600">전체 대비 {Math.round(((() => {
                  const allData = getSortedAgents(true);
                  const activeCount = allData.filter(agent => agent.currentMonth.premium > 0).length;
                  return activeCount;
                })() / currentAgentStatus.total) * 100)}% 가동률</div>
              </div>

              {/* 카테고리 선택 */}
              <div className="mb-4">
                {/* 첫 번째 줄: 전체, 신규가동 */}
                <div className="flex gap-2 mb-2">
                  {[
                    { key: 'all', label: '전체', count: currentAgentStatus.active, color: 'gray' },
                    { key: 'newActive', label: '신규가동', count: currentAgentStatus.newActive, color: 'green' }
                  ].map(tab => {
                    const isSelected = selectedContinuousTab === tab.key;

                    const baseClasses = 'px-2 py-1 rounded font-medium text-xs transition-all duration-200 whitespace-nowrap border';

                    let colorClasses = '';
                    if (tab.color === 'gray') {
                      colorClasses = isSelected
                        ? 'bg-gray-700 text-white border-gray-700'
                        : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50';
                    } else if (tab.color === 'green') {
                      colorClasses = isSelected
                        ? 'bg-green-500 text-white border-green-500'
                        : 'bg-white text-green-600 border-green-300 hover:bg-green-50';
                    }

                    return (
                      <button
                        key={tab.key}
                        onClick={() => setSelectedContinuousTab(tab.key as any)}
                        className={`${baseClasses} ${colorClasses}`}
                      >
                        {tab.label} ({tab.count}명)
                      </button>
                    );
                  })}
                </div>

                {/* 두 번째 줄: 2,3,6개월 연속 */}
                <div className="flex gap-2">
                  {[
                    { key: 'continuous2Months', label: '2개월연속', count: currentAgentStatus.continuous2Months, color: 'blue' },
                    { key: 'continuous3Months', label: '3개월연속', count: currentAgentStatus.continuous3Months, color: 'blue' },
                    { key: 'continuous6Months', label: '6개월연속', count: currentAgentStatus.continuous6Months, color: 'blue' }
                  ].map(tab => {
                    const isSelected = selectedContinuousTab === tab.key;

                    const baseClasses = 'px-2 py-1 rounded font-medium text-xs transition-all duration-200 whitespace-nowrap border';

                    let colorClasses = '';
                    if (tab.color === 'blue') {
                      colorClasses = isSelected
                        ? 'bg-blue-500 text-white border-blue-500'
                        : 'bg-white text-blue-600 border-blue-300 hover:bg-blue-50';
                    }

                    return (
                      <button
                        key={tab.key}
                        onClick={() => setSelectedContinuousTab(tab.key as any)}
                        className={`${baseClasses} ${colorClasses}`}
                      >
                        {tab.label} ({tab.count}명)
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* 선택된 탭의 설계사 리스트 */}
              {(() => {
                const allData = getSortedAgents(true);
                let filteredActiveAgents;

                if (selectedContinuousTab === 'all') {
                  // 전체: 가동 설계사 전체
                  filteredActiveAgents = allData.filter(agent => agent.currentMonth.premium > 0);
                } else {
                  const categoryNames = getAgentList(selectedContinuousTab);
                  filteredActiveAgents = allData.filter(agent => categoryNames.includes(agent.name) && agent.currentMonth.premium > 0);
                }

                // 가동 설계사 정렬
                const activeAgents = filteredActiveAgents.sort((a, b) => b.currentMonth.premium - a.currentMonth.premium);

                // 미가동 설계사 (전체에서 가동이 아닌 설계사)
                const inactiveAgents = allData.filter(agent => agent.currentMonth.premium === 0);

                return (
                  <div className="bg-white rounded-lg border border-gray-200">
                    <div className="bg-green-50 px-4 py-2 border-b border-green-200 rounded-t-lg flex justify-between items-center">
                      <h4 className="font-medium text-green-800 text-sm">가동 설계사 목록 ({activeAgents.length}명)</h4>
                      <div className="text-xs text-gray-500">
                        [단위: 만원]
                      </div>
                    </div>
                    <div className="max-h-60 overflow-y-auto">
                      <table className="w-full text-xs">
                        <thead className="bg-gray-50 sticky top-0">
                          <tr>
                            <th className="px-2 py-2 text-left font-medium text-gray-700 w-20">설계사코드</th>
                            <th className="px-2 py-2 text-left font-medium text-gray-700">이름</th>
                            <th className="px-2 py-2 text-right font-medium text-gray-700 whitespace-nowrap">위촉월차</th>
                            <th className="px-2 py-2 text-right font-medium text-gray-700 whitespace-nowrap">당월 MMP</th>
                            <th className="px-2 py-2 text-right font-medium text-gray-700 whitespace-nowrap">전월 MMP</th>
                          </tr>
                        </thead>
                        <tbody>
                          {activeAgents.length > 0 ? activeAgents.map((agent, idx) => (
                            <tr key={agent.name} className={idx % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                              <td className="px-2 py-2 text-gray-600 font-mono text-xs">{agent.agentCode}</td>
                              <td className="px-2 py-2 font-medium text-gray-800">{agent.name}</td>
                              <td className="px-2 py-2 text-right text-gray-600 text-xs">{agent.commissionMonth.replace('개월', '')}</td>
                              <td className="px-2 py-2 text-right font-medium text-green-600 whitespace-nowrap">{agent.currentMonth.premium.toFixed(1)}</td>
                              <td className="px-2 py-2 text-right text-gray-600 whitespace-nowrap">
                                {agent.previousMonth.premium === 0 ? '-' : agent.previousMonth.premium.toFixed(1)}
                              </td>
                            </tr>
                          )) : (
                            <tr>
                              <td colSpan={5} className="px-4 py-6 text-center text-gray-500 text-sm">해당 설계사가 없습니다</td>
                            </tr>
                          )}
                        </tbody>
                      </table>
                    </div>
                  </div>
                );
              })()}

              {/* 더보기 버튼 */}
              <div className="mt-4 pt-3 border-t border-gray-200">
                <button
                  onClick={() => {
                    setSelectedAgentCategory('allAgents');
                    setAgentListModal(true);
                  }}
                  className="w-full text-center text-xs text-blue-600 hover:text-blue-800 font-medium py-2 transition-colors"
                >
                  전체 가동 설계사 보기 →
                </button>
              </div>
            </div>

            {/* 당월 미가동 설계사 */}
            <div className="bg-white rounded-lg shadow-sm border p-4">
              <h3 className="text-sm font-semibold text-gray-700 mb-4">당월 미가동 설계사</h3>

              {/* 간략 현황 */}
              <div className="text-center mb-4 pb-4 border-b border-gray-200">
                <div className="text-2xl font-bold text-red-600">{(() => {
                  const allData = getSortedAgents(true);
                  const inactiveCount = allData.filter(agent => agent.currentMonth.premium === 0).length;
                  return inactiveCount;
                })()}<span className="text-sm text-gray-500">명</span></div>
                <div className="text-xs text-gray-600">전체 대비 {Math.round(((() => {
                  const allData = getSortedAgents(true);
                  const inactiveCount = allData.filter(agent => agent.currentMonth.premium === 0).length;
                  return inactiveCount;
                })() / currentAgentStatus.total) * 100)}% 미가동률</div>
              </div>

              {/* 미가동 설계사 리스트 */}
              {(() => {
                const allData = getSortedAgents(true);
                const inactiveAgents = allData.filter(agent => agent.currentMonth.premium === 0)
                  .sort((a, b) => {
                    // 위촉월차 내림차순 (경력 많은 순)
                    const aMonths = parseInt(a.commissionMonth.replace('개월', ''));
                    const bMonths = parseInt(b.commissionMonth.replace('개월', ''));
                    return bMonths - aMonths;
                  });

                return (
                  <div className="bg-white rounded-lg border border-gray-200">
                    <div className="bg-gray-50 px-4 py-2 border-b border-gray-200 rounded-t-lg flex justify-between items-center">
                      <h4 className="font-medium text-gray-700 text-sm">미가동 설계사 목록 ({inactiveAgents.length}명)</h4>
                      <div className="text-xs text-gray-500">
                        [단위: 만원]
                      </div>
                    </div>
                    <div className="max-h-60 overflow-y-auto">
                      <table className="w-full text-xs">
                        <thead className="bg-gray-50 sticky top-0">
                          <tr>
                            <th className="px-2 py-2 text-left font-medium text-gray-700 w-20">설계사코드</th>
                            <th className="px-2 py-2 text-left font-medium text-gray-700">이름</th>
                            <th className="px-2 py-2 text-right font-medium text-gray-700 whitespace-nowrap">위촉월차</th>
                            <th className="px-2 py-2 text-right font-medium text-gray-700 whitespace-nowrap">당월 MMP</th>
                            <th className="px-2 py-2 text-right font-medium text-gray-700 whitespace-nowrap">전월 MMP</th>
                          </tr>
                        </thead>
                        <tbody>
                          {inactiveAgents.length > 0 ? inactiveAgents.map((agent, idx) => (
                            <tr key={agent.name} className={idx % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                              <td className="px-2 py-2 text-gray-600 font-mono text-xs">{agent.agentCode}</td>
                              <td className="px-2 py-2 font-medium text-gray-800">{agent.name}</td>
                              <td className="px-2 py-2 text-right text-gray-600 text-xs">{agent.commissionMonth.replace('개월', '')}</td>
                              <td className="px-2 py-2 text-right text-gray-400">-</td>
                              <td className="px-2 py-2 text-right text-gray-600 whitespace-nowrap">
                                {agent.previousMonth.premium === 0 ? '-' : agent.previousMonth.premium.toFixed(1)}
                              </td>
                            </tr>
                          )) : (
                            <tr>
                              <td colSpan={5} className="px-4 py-6 text-center text-gray-500 text-sm">미가동 설계사가 없습니다</td>
                            </tr>
                          )}
                        </tbody>
                      </table>
                    </div>
                  </div>
                );
              })()}

              {/* 더보기 버튼 */}
              <div className="mt-4 pt-3 border-t border-gray-200">
                <button
                  onClick={() => {
                    setSelectedAgentCategory('inactive');
                    setAgentListModal(true);
                  }}
                  className="w-full text-center text-xs text-red-600 hover:text-red-800 font-medium py-2 transition-colors"
                >
                  전체 미가동 설계사 보기 →
                </button>
              </div>
            </div>

          </div>
        </div>
      </div>
      
      {/* 에이전트 리스트 모달 */}
      {agentListModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50" onClick={() => setAgentListModal(false)}>
          <div className="bg-white rounded-lg p-6 max-w-5xl w-full mx-4 max-h-[80vh] flex flex-col" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">
                {selectedAgentCategory === 'continuous6Months' && '6개월 연속 가동 설계사'}
                {selectedAgentCategory === 'continuous3Months' && '3개월 연속 가동 설계사'}
                {selectedAgentCategory === 'continuous2Months' && '2개월 연속 가동 설계사'}
                {selectedAgentCategory === 'newActive' && '전월 미가동→가동 전환 설계사'}
                {selectedAgentCategory === 'inactive' && '미가동 설계사'}
                {selectedAgentCategory === 'allAgents' && '전체 가동 설계사'}
              </h3>
              <button
                onClick={() => setAgentListModal(false)}
                className="text-gray-500 hover:text-gray-700 text-xl"
              >
                ✕
              </button>
            </div>

            <div className="flex justify-end mb-2">
              <span className="text-sm text-gray-500">[단위: 만원, 건]</span>
            </div>
            <div className="flex-1 overflow-y-auto">
              {/* 테이블 헤더 */}
              <div className="bg-gray-100 rounded-t-lg border-b">
                {/* 상위 헤더 */}
                <div className="grid gap-1 px-3 pt-3 pb-1 text-xs font-semibold text-gray-700" style={{gridTemplateColumns: '40px 80px 120px 60px 70px 200px 200px'}}>
                  <div></div>
                  <div></div>
                  <div></div>
                  <div></div>
                  <div></div>
                  <div className="text-center border-b border-gray-300 pb-1">MMP</div>
                  <div className="text-center border-b border-gray-300 pb-1">청약건수</div>
                </div>
                {/* 하위 헤더 */}
                <div className="grid gap-1 px-3 pb-3 pt-1 text-xs font-semibold text-gray-700" style={{gridTemplateColumns: '40px 80px 120px 60px 70px 50px 50px 50px 50px 50px 50px 50px 50px'}}>
                      <button
                        onClick={() => {
                          if (agentSortBy === 'index') {
                            setAgentSortOrder(agentSortOrder === 'desc' ? 'asc' : 'desc');
                          } else {
                            setAgentSortBy('index');
                            setAgentSortOrder('asc');
                          }
                        }}
                        className="text-center hover:text-blue-600 transition-colors"
                      >
                        번호 {agentSortBy === 'index' && (agentSortOrder === 'desc' ? '↓' : '↑')}
                      </button>
                      <button
                        onClick={() => {
                          if (agentSortBy === 'agentCode') {
                            setAgentSortOrder(agentSortOrder === 'desc' ? 'asc' : 'desc');
                          } else {
                            setAgentSortBy('agentCode');
                            setAgentSortOrder('asc');
                          }
                        }}
                        className="text-left hover:text-blue-600 transition-colors"
                      >
                        설계사코드 {agentSortBy === 'agentCode' && (agentSortOrder === 'desc' ? '↓' : '↑')}
                      </button>
                      <button
                        onClick={() => {
                          if (agentSortBy === 'name') {
                            setAgentSortOrder(agentSortOrder === 'desc' ? 'asc' : 'desc');
                          } else {
                            setAgentSortBy('name');
                            setAgentSortOrder('asc');
                          }
                        }}
                        className="text-left hover:text-blue-600 transition-colors"
                      >
                        이름 {agentSortBy === 'name' && (agentSortOrder === 'desc' ? '↓' : '↑')}
                      </button>
                      <button
                        onClick={() => {
                          if (agentSortBy === 'experience') {
                            setAgentSortOrder(agentSortOrder === 'desc' ? 'asc' : 'desc');
                          } else {
                            setAgentSortBy('experience');
                            setAgentSortOrder('desc');
                          }
                        }}
                        className="text-center hover:text-blue-600 transition-colors"
                      >
                        설계사 경력 {agentSortBy === 'experience' && (agentSortOrder === 'desc' ? '↓' : '↑')}
                      </button>
                      <button
                        onClick={() => {
                          if (agentSortBy === 'commissionMonth') {
                            setAgentSortOrder(agentSortOrder === 'desc' ? 'asc' : 'desc');
                          } else {
                            setAgentSortBy('commissionMonth');
                            setAgentSortOrder('desc');
                          }
                        }}
                        className="text-center hover:text-blue-600 transition-colors"
                      >
                        위촉월차 {agentSortBy === 'commissionMonth' && (agentSortOrder === 'desc' ? '↓' : '↑')}
                      </button>
                      <button
                        onClick={() => {
                          if (agentSortBy === 'mmp0') {
                            setAgentSortOrder(agentSortOrder === 'desc' ? 'asc' : 'desc');
                          } else {
                            setAgentSortBy('mmp0');
                            setAgentSortOrder('desc');
                          }
                        }}
                        className="text-center text-xs hover:text-blue-600 transition-colors"
                      >
                        M-0 {agentSortBy === 'mmp0' && (agentSortOrder === 'desc' ? '↓' : '↑')}
                      </button>
                      <button
                        onClick={() => {
                          if (agentSortBy === 'mmp1') {
                            setAgentSortOrder(agentSortOrder === 'desc' ? 'asc' : 'desc');
                          } else {
                            setAgentSortBy('mmp1');
                            setAgentSortOrder('desc');
                          }
                        }}
                        className="text-center text-xs hover:text-blue-600 transition-colors"
                      >
                        M-1 {agentSortBy === 'mmp1' && (agentSortOrder === 'desc' ? '↓' : '↑')}
                      </button>
                      <button
                        onClick={() => {
                          if (agentSortBy === 'mmp2') {
                            setAgentSortOrder(agentSortOrder === 'desc' ? 'asc' : 'desc');
                          } else {
                            setAgentSortBy('mmp2');
                            setAgentSortOrder('desc');
                          }
                        }}
                        className="text-center text-xs hover:text-blue-600 transition-colors"
                      >
                        M-2 {agentSortBy === 'mmp2' && (agentSortOrder === 'desc' ? '↓' : '↑')}
                      </button>
                      <button
                        onClick={() => {
                          if (agentSortBy === 'mmp3') {
                            setAgentSortOrder(agentSortOrder === 'desc' ? 'asc' : 'desc');
                          } else {
                            setAgentSortBy('mmp3');
                            setAgentSortOrder('desc');
                          }
                        }}
                        className="text-center text-xs hover:text-blue-600 transition-colors"
                      >
                        M-3 {agentSortBy === 'mmp3' && (agentSortOrder === 'desc' ? '↓' : '↑')}
                      </button>
                      <button
                        onClick={() => {
                          if (agentSortBy === 'contract0') {
                            setAgentSortOrder(agentSortOrder === 'desc' ? 'asc' : 'desc');
                          } else {
                            setAgentSortBy('contract0');
                            setAgentSortOrder('desc');
                          }
                        }}
                        className="text-center text-xs hover:text-blue-600 transition-colors"
                      >
                        M-0 {agentSortBy === 'contract0' && (agentSortOrder === 'desc' ? '↓' : '↑')}
                      </button>
                      <button
                        onClick={() => {
                          if (agentSortBy === 'contract1') {
                            setAgentSortOrder(agentSortOrder === 'desc' ? 'asc' : 'desc');
                          } else {
                            setAgentSortBy('contract1');
                            setAgentSortOrder('desc');
                          }
                        }}
                        className="text-center text-xs hover:text-blue-600 transition-colors"
                      >
                        M-1 {agentSortBy === 'contract1' && (agentSortOrder === 'desc' ? '↓' : '↑')}
                      </button>
                      <button
                        onClick={() => {
                          if (agentSortBy === 'contract2') {
                            setAgentSortOrder(agentSortOrder === 'desc' ? 'asc' : 'desc');
                          } else {
                            setAgentSortBy('contract2');
                            setAgentSortOrder('desc');
                          }
                        }}
                        className="text-center text-xs hover:text-blue-600 transition-colors"
                      >
                        M-2 {agentSortBy === 'contract2' && (agentSortOrder === 'desc' ? '↓' : '↑')}
                      </button>
                      <button
                        onClick={() => {
                          if (agentSortBy === 'contract3') {
                            setAgentSortOrder(agentSortOrder === 'desc' ? 'asc' : 'desc');
                          } else {
                            setAgentSortBy('contract3');
                            setAgentSortOrder('desc');
                          }
                        }}
                        className="text-center text-xs hover:text-blue-600 transition-colors"
                      >
                        M-3 {agentSortBy === 'contract3' && (agentSortOrder === 'desc' ? '↓' : '↑')}
                      </button>
                </div>
              </div>
              
              {/* 테이블 내용 */}
              <div className="space-y-0">
                {selectedAgentCategory && (() => {
                  let agentData;

                  // 모든 카테고리에 대해 동일한 데이터 생성 로직 사용
                  const allData = getSortedAgents(true);

                  // 카테고리에 따라 에이전트 필터링
                  let filteredAgents;
                  if (selectedAgentCategory === 'allAgents') {
                    filteredAgents = allData.filter(agent => agent.currentMonth.premium > 0);
                  } else {
                    const categoryNames = getAgentList(selectedAgentCategory);
                    filteredAgents = allData.filter(agent => categoryNames.includes(agent.name));
                  }

                  agentData = filteredAgents.map((agent, idx) => {
                    // 위촉 월차 계산
                    const commissionMonths = baseAgentLists.newCommissioned.includes(agent.name)
                      ? 1 // 신규 위촉은 1개월차
                      : (baseAgentLists.newActive.includes(agent.name) && (agent.name === '김배태' || agent.name === '박예진'))
                      ? 1 // 김배태, 박예진은 신규 위촉이므로 1개월차
                      : baseAgentLists.newActive.includes(agent.name)
                      ? Math.floor(Math.random() * 12) + 3 // 나머지 신규 가동은 3-14개월차 (기존 설계사가 처음 실적)
                      : Math.floor(Math.random() * 120) + 1; // 나머지는 1-120개월차

                    return {
                      name: agent.name,
                      code: agent.agentCode,
                      experience: agent.experience,
                      currentMMP: agent.currentMonth.premium,
                      previousMMP: agent.previousMonth.premium,
                      avgMMP: agent.threeMonthAverage.premium,
                      currentContracts: agent.currentMonth.contracts,
                      previousContracts: agent.previousMonth.contracts,
                      commissionMonths,
                      isActive: agent.isActive,
                      originalIndex: idx
                    };
                  });

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
                      case 'avgMMP':
                        aValue = a.avgMMP || 0;
                        bValue = b.avgMMP || 0;
                        break;
                      case 'currentContracts':
                        aValue = a.currentContracts || 0;
                        bValue = b.currentContracts || 0;
                        break;
                      case 'previousContracts':
                        aValue = a.previousContracts || 0;
                        bValue = b.previousContracts || 0;
                        break;
                      case 'mmp0':
                        aValue = a.currentMMP || 0;
                        bValue = b.currentMMP || 0;
                        break;
                      case 'mmp1':
                        aValue = a.previousMMP || 0;
                        bValue = b.previousMMP || 0;
                        break;
                      case 'mmp2':
                      case 'mmp3':
                        aValue = Math.floor(Math.random() * 100) + 20;
                        bValue = Math.floor(Math.random() * 100) + 20;
                        break;
                      case 'contract0':
                        aValue = a.currentContracts || 0;
                        bValue = b.currentContracts || 0;
                        break;
                      case 'contract1':
                        aValue = a.previousContracts || 0;
                        bValue = b.previousContracts || 0;
                        break;
                      case 'contract2':
                      case 'contract3':
                        aValue = Math.floor(Math.random() * 10) + 1;
                        bValue = Math.floor(Math.random() * 10) + 1;
                        break;
                      case 'index':
                        aValue = a.originalIndex;
                        bValue = b.originalIndex;
                        break;
                      case 'agentCode':
                        return agentSortOrder === 'desc'
                          ? b.code.localeCompare(a.code)
                          : a.code.localeCompare(b.code);
                      case 'name':
                        return agentSortOrder === 'desc'
                          ? b.name.localeCompare(a.name)
                          : a.name.localeCompare(b.name);
                      case 'experience':
                        aValue = parseFloat(a.experience?.replace('년차', '') || '0');
                        bValue = parseFloat(b.experience?.replace('년차', '') || '0');
                        break;
                      case 'commissionMonth':
                        aValue = a.commissionMonths || 0;
                        bValue = b.commissionMonths || 0;
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
                        // 전월 가동→미가동 전환
                        rowBgClass = 'bg-red-50';
                      } else if (agent.isActive && agent.previousMMP === 0) {
                        // 전월 미가동→가동 전환
                        rowBgClass = 'bg-green-50';
                      }
                    } else {
                      if (selectedAgentCategory === 'newActive') {
                        rowBgClass = 'bg-green-50';
                      } else if (selectedAgentCategory === 'inactive') {
                        rowBgClass = 'bg-gray-100';
                      }
                    }

                    return (
                      <div key={idx} className={`border-b hover:bg-gray-50 transition-colors ${rowBgClass}`}>
                        <div className="grid gap-1 p-3 text-sm" style={{gridTemplateColumns: '40px 80px 120px 60px 70px 50px 50px 50px 50px 50px 50px 50px 50px'}}>
                          <div className={`text-center text-xs ${agentSortBy === 'index' ? 'text-blue-600 font-medium' : 'text-gray-600'}`}>{idx + 1}</div>
                          <div className={`font-mono text-xs ${agentSortBy === 'agentCode' ? 'text-blue-600 font-medium' : 'text-gray-600'}`}>{agent.code}</div>
                          <div className={`font-medium ${agentSortBy === 'name' ? 'text-blue-600' : ''}`}>{agent.name}</div>
                          <div className={`text-center text-xs ${agentSortBy === 'experience' ? 'text-blue-600 font-medium' : 'text-gray-600'}`}>{agent.experience}</div>
                          <div className={`text-center text-xs ${agentSortBy === 'commissionMonth' ? 'text-blue-600 font-medium' : 'text-gray-600'}`}>{agent.commissionMonths || '12'}개월</div>
                          {/* MMP M-0~M-3 */}
                          {Array.from({length: 4}).map((_, monthIdx) => {
                            const mmpValue = monthIdx === 0 ? agent.currentMMP :
                                           monthIdx === 1 ? agent.previousMMP :
                                           Math.floor(Math.random() * 100) + 20;
                            const isActiveSort = agentSortBy === `mmp${monthIdx}`;
                            return (
                              <div key={`mmp-${monthIdx}`} className="text-center text-xs">
                                {mmpValue > 0 ? (
                                  <span className={isActiveSort ? "text-blue-600 font-medium" : "text-gray-900"}>{mmpValue.toFixed(1)}</span>
                                ) : (
                                  <span className="text-gray-400">-</span>
                                )}
                              </div>
                            );
                          })}
                          {/* 청약건수 M-0~M-3 */}
                          {Array.from({length: 4}).map((_, monthIdx) => {
                            const contractValue = monthIdx === 0 ? agent.currentContracts :
                                                 monthIdx === 1 ? agent.previousContracts :
                                                 Math.floor(Math.random() * 10) + 1;
                            const isActiveSort = agentSortBy === `contract${monthIdx}`;
                            return (
                              <div key={`contract-${monthIdx}`} className="text-center text-xs">
                                {contractValue > 0 ? (
                                  <span className={isActiveSort ? "text-blue-600 font-medium" : "text-gray-900"}>{contractValue}</span>
                                ) : (
                                  <span className="text-gray-400">-</span>
                                )}
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    );
                  });
                })()}
              </div>
            </div>
            
            <div className="mt-4 pt-4 border-t text-center">
              <span className="text-sm text-gray-500">총 {selectedAgentCategory === 'allAgents' ? getSortedAgents(true).filter(agent => agent.currentMonth.premium > 0).length : (selectedAgentCategory ? getAgentList(selectedAgentCategory).length : 0)}명</span>
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
                      {selectedAgent.isActive ? `${selectedAgent.currentMonth.premium.toFixed(1)}만원` : '-'}
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
                    <div className="font-medium text-gray-700">
                      {selectedAgent.previousMonth.premium === 0 ? '-' : `${selectedAgent.previousMonth.premium.toFixed(1)}만원`}
                    </div>
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
                    <div className="font-medium text-green-700">{(selectedAgent.threeMonthAverage?.premium || 0).toFixed(1)}만원</div>
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
              <h3 className="text-lg font-semibold text-gray-900">전체 위촉 설계사</h3>
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
                <div className="grid grid-cols-7 gap-2 p-3 text-xs font-semibold text-gray-700">
                  <button
                    onClick={() => {
                      if (agentSortBy === 'index') {
                        setAgentSortOrder(agentSortOrder === 'desc' ? 'asc' : 'desc');
                      } else {
                        setAgentSortBy('index');
                        setAgentSortOrder('asc');
                      }
                    }}
                    className="text-left hover:text-blue-600 transition-colors"
                  >
                    번호 {agentSortBy === 'index' && (agentSortOrder === 'desc' ? '↓' : '↑')}
                  </button>
                  <button
                    onClick={() => {
                      if (agentSortBy === 'agentCode') {
                        setAgentSortOrder(agentSortOrder === 'desc' ? 'asc' : 'desc');
                      } else {
                        setAgentSortBy('agentCode');
                        setAgentSortOrder('asc');
                      }
                    }}
                    className="text-left hover:text-blue-600 transition-colors"
                  >
                    설계사번호 {agentSortBy === 'agentCode' && (agentSortOrder === 'desc' ? '↓' : '↑')}
                  </button>
                  <button
                    onClick={() => {
                      if (agentSortBy === 'name') {
                        setAgentSortOrder(agentSortOrder === 'desc' ? 'asc' : 'desc');
                      } else {
                        setAgentSortBy('name');
                        setAgentSortOrder('asc');
                      }
                    }}
                    className="text-left hover:text-blue-600 transition-colors"
                  >
                    설계사명 {agentSortBy === 'name' && (agentSortOrder === 'desc' ? '↓' : '↑')}
                  </button>
                  <button
                    onClick={() => {
                      if (agentSortBy === 'experience') {
                        setAgentSortOrder(agentSortOrder === 'desc' ? 'asc' : 'desc');
                      } else {
                        setAgentSortBy('experience');
                        setAgentSortOrder('desc');
                      }
                    }}
                    className="text-left hover:text-blue-600 transition-colors"
                  >
                    설계사 경력 {agentSortBy === 'experience' && (agentSortOrder === 'desc' ? '↓' : '↑')}
                  </button>
                  <button
                    onClick={() => {
                      if (agentSortBy === 'commissionMonth') {
                        setAgentSortOrder(agentSortOrder === 'desc' ? 'asc' : 'desc');
                      } else {
                        setAgentSortBy('commissionMonth');
                        setAgentSortOrder('desc');
                      }
                    }}
                    className="text-left hover:text-blue-600 transition-colors"
                  >
                    위촉월차 {agentSortBy === 'commissionMonth' && (agentSortOrder === 'desc' ? '↓' : '↑')}
                  </button>
                  <button
                    onClick={() => {
                      if (agentSortBy === 'currentActive') {
                        setAgentSortOrder(agentSortOrder === 'desc' ? 'asc' : 'desc');
                      } else {
                        setAgentSortBy('currentActive');
                        setAgentSortOrder('desc');
                      }
                    }}
                    className="text-left hover:text-blue-600 transition-colors"
                  >
                    당월가동 {agentSortBy === 'currentActive' && (agentSortOrder === 'desc' ? '↓' : '↑')}
                  </button>
                  <button
                    onClick={() => {
                      if (agentSortBy === 'previousActive') {
                        setAgentSortOrder(agentSortOrder === 'desc' ? 'asc' : 'desc');
                      } else {
                        setAgentSortBy('previousActive');
                        setAgentSortOrder('desc');
                      }
                    }}
                    className="text-left hover:text-blue-600 transition-colors"
                  >
                    전월가동 {agentSortBy === 'previousActive' && (agentSortOrder === 'desc' ? '↓' : '↑')}
                  </button>
                </div>
              </div>
              
              {/* 테이블 내용 */}
              <div className="space-y-0">
                {getSortedAgents(true).map((agent, idx) => {
                  // 상태에 따른 배경색 설정
                  let rowBgClass = '';
                  if (!agent.isActive && agent.previousMonth.premium > 0) {
                    // 전월 가동→미가동 전환 (4명)
                    rowBgClass = 'bg-red-50';
                  } else if (agent.isActive && agent.previousMonth.premium === 0) {
                    // 전월 미가동→가동 전환 (4명)
                    rowBgClass = 'bg-green-50';
                  }

                  return (
                    <div
                      key={idx}
                      className={`grid grid-cols-7 gap-2 p-3 border-b border-gray-100 hover:bg-gray-50 transition-colors ${rowBgClass}`}
                    >
                    <div className="flex items-center justify-center">
                      <div className="text-xs text-gray-600">{idx + 1}</div>
                    </div>
                    <div className="flex items-center">
                      <div className="font-mono text-sm text-gray-600">{agent.agentCode}</div>
                    </div>
                    <div className="flex items-center">
                      <div className="text-sm font-medium text-gray-900">{agent.name}</div>
                    </div>
                    <div className="flex items-center">
                      <div className="text-xs text-gray-600">{agent.experience || '1.0년차'}</div>
                    </div>
                    <div className="flex items-center">
                      <div className="text-xs text-gray-600">{agent.commissionMonth || '12개월'}</div>
                    </div>
                    <div className="flex items-center justify-center">
                      <span className="text-xs text-gray-600">
                        {agent.isActive && agent.currentMonth.premium > 0 ? 'Y' : 'N'}
                      </span>
                    </div>
                    <div className="flex items-center justify-center">
                      <span className="text-xs text-gray-600">
                        {agent.previousMonth.premium > 0 ? 'Y' : 'N'}
                      </span>
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
                    