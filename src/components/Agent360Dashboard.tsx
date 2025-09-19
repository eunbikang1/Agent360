import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Trophy, Download, Building, ChevronRight, ChevronDown, ArrowUp, ArrowDown, Activity, AlertTriangle, HelpCircle, X } from 'lucide-react';

const Agent360Dashboard = () => {
  const navigate = useNavigate();
  const [selectedKPI, setSelectedKPI] = useState('nb_plan');
  const [selectedYear, setSelectedYear] = useState('2025');
  const [selectedProduct, setSelectedProduct] = useState('전체');
  const [productSortBy, setProductSortBy] = useState('amount');

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

  // 영업일 현황
  const businessDays = {
    total: 22,
    elapsed: 15,
    remaining: 7
  };

  // 나의 KPI 데이터 (기본값 - 현재 월용)
  const myKPIDefault = {
    // 목표달성률 (APE 기준)
    goalAchievement: {
      current: 62.0, // 현재 달성률 (%)
      target: 50000, // 목표 (만원)
      actual: 31000, // 실제 (만원)
      hqAvg: 58.3, // 영업본부 평균 (%)
      vsLastMonth: 12.5, // 전월 동기 대비 증감 (%p)
      gap: 19000, // 남은 금액 (만원)
      dailyRequired: 2710, // 일평균 필요 (만원)
      hqRankTotal: { rank: 8, total: 50 }, // 전체 지점장 순위
      hqRankRegion: { rank: 4, total: 10 } // 영업본부 순위
    },
    // 설계사 가동률
    designerActivity: {
      current: 65.2, // 현재 가동률 (%)
      active: 456, // 가동 설계사 수
      total: 700, // 전체 관리 설계사 수
      hqAvg: 62.8, // 영업본부 평균 (%)
      vsLastMonth: -5, // 전월 동기 대비 증감 (명) - 전체 설계사 감소
      vsLastMonthPercent: 2.1, // 전월 동기 대비 증감 (%p) - 가동률은 상승
      plan: 450, // 가동 계획
      planAchievement: 101.3 // 가동 계획 대비 달성률 (%)
    },
    // 모바일 청약률
    mobileContract: {
      current: 45.8, // 현재 모바일 청약률 (%)
      count: 103, // 모바일 청약 건수
      total: 225, // 전체 청약 건수
      hqAvg: 42.6, // 영업본부 평균 (%)
      vsLastMonth: -12, // 전월 동기 대비 증감 (건) - 모바일 건수 감소
      vsLastMonthPercent: 3.2 // 전월 동기 대비 증감 (%p) - 비율은 상승
    }
  };

  // myKPI는 기본값 (컴포넌트 내부에서 재정의됨)
  let myKPI = myKPIDefault;

  // 월별 성과 추이 데이터
  const monthlyTrend = {
    2023: {
      nb_plan: [
        { month: '1월', value: 103.5, hqAvg: 102.2, actual: 414, target: 400 },
        { month: '2월', value: 98.2, hqAvg: 99.8, actual: 491, target: 500 },
        { month: '3월', value: 96.7, hqAvg: 98.2, actual: 387, target: 400 },
        { month: '4월', value: 105.2, hqAvg: 101.5, actual: 526, target: 500 },
        { month: '5월', value: 99.8, hqAvg: 101.3, actual: 399, target: 400 },
        { month: '6월', value: 102.6, hqAvg: 98.2, actual: 513, target: 500 },
        { month: '7월', value: 97.3, hqAvg: 99.1, actual: 389, target: 400 },
        { month: '8월', value: 104.2, hqAvg: 102.5, actual: 521, target: 500 },
        { month: '9월', value: 101.8, hqAvg: 100.3, actual: 407, target: 400 },
        { month: '10월', value: 96.5, hqAvg: 98.8, actual: 482, target: 500 },
        { month: '11월', value: 103.2, hqAvg: 99.5, actual: 413, target: 400 },
        { month: '12월', value: 98.2, hqAvg: 102.3, actual: 491, target: 500 }
      ],
      activity_plan: [
        { month: '1월', value: 74.5, hqAvg: 77.2, active: 372, target: 500 },
        { month: '2월', value: 78.2, hqAvg: 75.8, active: 391, target: 500 },
        { month: '3월', value: 76.7, hqAvg: 79.2, active: 384, target: 500 },
        { month: '4월', value: 79.2, hqAvg: 76.5, active: 396, target: 500 },
        { month: '5월', value: 75.8, hqAvg: 78.3, active: 379, target: 500 },
        { month: '6월', value: 82.6, hqAvg: 78.2, active: 413, target: 500 },
        { month: '7월', value: 77.3, hqAvg: 80.1, active: 387, target: 500 },
        { month: '8월', value: 80.2, hqAvg: 77.5, active: 401, target: 500 },
        { month: '9월', value: 73.8, hqAvg: 76.3, active: 369, target: 500 },
        { month: '10월', value: 76.5, hqAvg: 79.8, active: 383, target: 500 },
        { month: '11월', value: 79.2, hqAvg: 76.5, active: 396, target: 500 },
        { month: '12월', value: 81.3, hqAvg: 78.3, active: 407, target: 500 }
      ],
      mobile_contract: [
        { month: '1월', value: 38.5, hqAvg: 36.2, count: 85, total: 221 },
        { month: '2월', value: 42.1, hqAvg: 39.8, count: 92, total: 218 },
        { month: '3월', value: 35.7, hqAvg: 38.2, count: 78, total: 218 },
        { month: '4월', value: 44.2, hqAvg: 41.5, count: 98, total: 222 },
        { month: '5월', value: 39.8, hqAvg: 40.3, count: 87, total: 219 },
        { month: '6월', value: 43.6, hqAvg: 38.2, count: 96, total: 220 },
        { month: '7월', value: 37.3, hqAvg: 39.1, count: 82, total: 220 },
        { month: '8월', value: 45.2, hqAvg: 42.5, count: 101, total: 223 },
        { month: '9월', value: 41.8, hqAvg: 40.3, count: 91, total: 218 },
        { month: '10월', value: 36.5, hqAvg: 38.8, count: 80, total: 219 },
        { month: '11월', value: 44.2, hqAvg: 39.5, count: 97, total: 220 },
        { month: '12월', value: 40.2, hqAvg: 42.3, count: 88, total: 219 }
      ]
    },
    2024: {
      nb_plan: [
        { month: '1월', value: 105.5, hqAvg: 103.2, actual: 422, target: 400 },
        { month: '2월', value: 97.2, hqAvg: 99.8, actual: 486, target: 500 },
        { month: '3월', value: 102.7, hqAvg: 101.2, actual: 411, target: 400 },
        { month: '4월', value: 98.2, hqAvg: 100.5, actual: 491, target: 500 },
        { month: '5월', value: 103.8, hqAvg: 98.3, actual: 415, target: 400 },
        { month: '6월', value: 99.6, hqAvg: 102.2, actual: 498, target: 500 },
        { month: '7월', value: 106.3, hqAvg: 101.1, actual: 425, target: 400 },
        { month: '8월', value: 101.2, hqAvg: 99.5, actual: 506, target: 500 },
        { month: '9월', value: 97.8, hqAvg: 100.3, actual: 391, target: 400 },
        { month: '10월', value: 104.5, hqAvg: 98.8, actual: 522, target: 500 },
        { month: '11월', value: 102.2, hqAvg: 103.5, actual: 409, target: 400 },
        { month: '12월', value: 99.2, hqAvg: 101.3, actual: 496, target: 500 }
      ],
      activity_plan: [
        { month: '1월', value: 76.5, hqAvg: 79.2, active: 383, target: 500 },
        { month: '2월', value: 79.2, hqAvg: 76.8, active: 396, target: 500 },
        { month: '3월', value: 73.7, hqAvg: 76.2, active: 369, target: 500 },
        { month: '4월', value: 78.2, hqAvg: 80.5, active: 391, target: 500 },
        { month: '5월', value: 81.8, hqAvg: 78.3, active: 409, target: 500 },
        { month: '6월', value: 74.6, hqAvg: 77.2, active: 373, target: 500 },
        { month: '7월', value: 77.3, hqAvg: 79.1, active: 387, target: 500 },
        { month: '8월', value: 80.2, hqAvg: 78.5, active: 401, target: 500 },
        { month: '9월', value: 75.8, hqAvg: 78.3, active: 379, target: 500 },
        { month: '10월', value: 78.5, hqAvg: 76.8, active: 393, target: 500 },
        { month: '11월', value: 72.2, hqAvg: 75.5, active: 361, target: 500 },
        { month: '12월', value: 79.3, hqAvg: 77.5, active: 397, target: 500 }
      ],
      mobile_contract: [
        { month: '1월', value: 40.5, hqAvg: 38.2, count: 89, total: 220 },
        { month: '2월', value: 43.1, hqAvg: 41.8, count: 95, total: 220 },
        { month: '3월', value: 37.7, hqAvg: 39.2, count: 83, total: 220 },
        { month: '4월', value: 45.2, hqAvg: 42.5, count: 99, total: 219 },
        { month: '5월', value: 41.8, hqAvg: 41.3, count: 92, total: 220 },
        { month: '6월', value: 44.6, hqAvg: 40.2, count: 98, total: 220 },
        { month: '7월', value: 39.3, hqAvg: 41.1, count: 86, total: 219 },
        { month: '8월', value: 46.2, hqAvg: 43.5, count: 101, total: 218 },
        { month: '9월', value: 42.8, hqAvg: 41.3, count: 94, total: 220 },
        { month: '10월', value: 38.5, hqAvg: 40.8, count: 84, total: 218 },
        { month: '11월', value: 45.2, hqAvg: 41.5, count: 99, total: 219 },
        { month: '12월', value: 43.3, hqAvg: 43.5, count: 95, total: 219 }
      ]
    },
    2025: {
      nb_plan: [
        { month: '1월', value: 105.5, hqAvg: 103.2, actual: 422, target: 400 },
        { month: '2월', value: 98.2, hqAvg: 100.8, actual: 491, target: 500 },
        { month: '3월', value: 102.7, hqAvg: 99.2, actual: 411, target: 400 },
        { month: '4월', value: 97.2, hqAvg: 101.5, actual: 486, target: 500 },
        { month: '5월', value: 103.8, hqAvg: 98.3, actual: 415, target: 400 },
        { month: '6월', value: 99.6, hqAvg: 102.2, actual: 498, target: 500 },
        { month: '7월', value: 106.3, hqAvg: 101.1, actual: 425, target: 400 },
        { month: '8월', value: 101.2, hqAvg: 103.5, actual: 506, target: 500 },
        { month: '9월', value: 62.0, hqAvg: 98.3, actual: 310, target: 500 }
      ],
      activity_plan: [
        { month: '1월', value: 76.5, hqAvg: 79.2, active: 383, target: 500 },
        { month: '2월', value: 72.2, hqAvg: 75.8, active: 361, target: 500 },
        { month: '3월', value: 79.7, hqAvg: 77.2, active: 399, target: 500 },
        { month: '4월', value: 73.2, hqAvg: 76.5, active: 366, target: 500 },
        { month: '5월', value: 77.8, hqAvg: 80.3, active: 389, target: 500 },
        { month: '6월', value: 74.6, hqAvg: 77.2, active: 373, target: 500 },
        { month: '7월', value: 81.3, hqAvg: 78.1, active: 407, target: 500 },
        { month: '8월', value: 79.2, hqAvg: 81.5, active: 396, target: 500 },
        { month: '9월', value: 75.2, hqAvg: 77.8, active: 456, target: 607 }
      ],
      mobile_contract: [
        { month: '1월', value: 42.5, hqAvg: 40.2, count: 93, total: 219 },
        { month: '2월', value: 44.1, hqAvg: 42.8, count: 97, total: 220 },
        { month: '3월', value: 39.7, hqAvg: 41.2, count: 87, total: 219 },
        { month: '4월', value: 46.2, hqAvg: 43.5, count: 101, total: 218 },
        { month: '5월', value: 42.8, hqAvg: 42.3, count: 94, total: 220 },
        { month: '6월', value: 45.6, hqAvg: 41.2, count: 100, total: 219 },
        { month: '7월', value: 40.3, hqAvg: 42.1, count: 88, total: 218 },
        { month: '8월', value: 47.2, hqAvg: 44.5, count: 103, total: 218 },
        { month: '9월', value: 45.8, hqAvg: 42.6, count: 103, total: 225 }
      ]
    }
  };




  // 지점 기본정보 데이터 함수
  const getBranchInfoData = () => {
    // 기존 지점 랭킹 데이터에서 전체 160개 지점 가져오기 (가동 + 비가동)
    const rankingData = getBranchRankings(true).data;

    // 기본 주소, 연락처, 제휴일자 정보 매핑
    const branchInfoMap = {
      '글로벌화이브스타': { address: '인천 연수구 컨벤시아대로 234', phone: '032-567-8901', partnershipDate: '2021.12.20' },
      '하나돔': { address: '부산 해운대구 해운대로 456', phone: '051-345-6789', partnershipDate: '2023.01.08' },
      '리더스에프엔': { address: '대구 중구 동성로 78', phone: '053-456-7890', partnershipDate: '2022.07.03' },
      '서울': { address: '서울 강남구 테헤란로 123', phone: '02-567-8901', partnershipDate: '2021.08.22' },
      '보험스토어': { address: '서울 마포구 월드컵로 234', phone: '02-678-9012', partnershipDate: '2022.03.15' },
      '일산센터': { address: '경기 고양시 일산서구 주엽로 345', phone: '031-789-0123', partnershipDate: '2020.11.10' },
      '하나돔강북': { address: '서울 강북구 도봉로 456', phone: '02-890-1234', partnershipDate: '2021.07.16' },
      '리더스일산': { address: '경기 고양시 일산동구 중앙로 567', phone: '031-901-2345', partnershipDate: '2022.05.14' },
      '대원': { address: '서울 송파구 올림픽로 678', phone: '02-012-3456', partnershipDate: '2020.09.20' },
      '일산지사': { address: '경기 고양시 덕양구 화정로 789', phone: '031-123-4567', partnershipDate: '2021.04.12' },
      '화이브스타성화': { address: '서울 성동구 왕십리로 890', phone: '02-234-5678', partnershipDate: '2022.11.08' },
      '리더스마이보험체크': { address: '서울 구로구 디지털로 123', phone: '02-345-6789', partnershipDate: '2021.12.22' },
      '이센트럴마포': { address: '서울 마포구 상암로 234', phone: '02-456-7890', partnershipDate: '2020.06.15' },
      '케이엘아이은평': { address: '서울 은평구 진관로 345', phone: '02-567-8901', partnershipDate: '2023.02.28' },
      '케이엘아이운정': { address: '경기 파주시 경의로 456', phone: '031-678-9012', partnershipDate: '2022.08.18' }
    };

    // 기본 정보가 없는 지점들을 위한 기본값
    const getDefaultInfo = (index) => ({
      address: `서울 강남구 테헤란로 ${100 + index * 10}`,
      phone: `02-${String(100 + index).padStart(3, '0')}-${String(1000 + index * 10).padStart(4, '0')}`,
      partnershipDate: ['2020.01.15', '2021.03.22', '2022.05.10', '2023.07.08'][index % 4]
    });

    // 지점 데이터 변환 (160개로 제한)
    const branches = rankingData.slice(0, 160).map((branch, index) => {
      const branchKey = branch.branch;
      const info = branchInfoMap[branchKey] || getDefaultInfo(index);

      // 실적이 있는 지점만 설계사 수 계산, 없으면 '-'
      let totalAgents, activeAgents;
      if (branch.ape > 0) {
        totalAgents = Math.max(15, Math.floor(branch.ape / 3) + (index % 10)); // APE 기반 계산
        activeAgents = Math.floor(totalAgents * 0.6) + (index % 5); // 가동 설계사는 총 설계사의 약 60%
      } else {
        totalAgents = '-';
        activeAgents = '-';
      }

      return {
        no: index + 1,
        agency: branch.agency,
        branch: branch.branch,
        address: info.address,
        phone: info.phone,
        partnershipDate: info.partnershipDate,
        totalAgents: totalAgents,
        activeAgents: activeAgents,
        currentMonthAPE: branch.ape || 0
      };
    });

    return branches;
  };

  // 관리 포커스 지점 (위험 신호 & 기회 신호)
  const managementFocus = {
    critical: [
      {
        id: 1,
        agency: '메타리치',
        branch: '보험스토어',
        tag: '실적 급하락',
        reason: '전월 동기 대비 APE -35% 급락',
        metric: '-35%',
        priority: 'critical',
        type: 'risk'
      },
      {
        id: 2,
        agency: '글로벌금융판매',
        branch: '케이에스에프에스동대문',
        tag: '목표달성 미달',
        reason: '목표 페이스 대비 현재 실적 -32% 미달',
        metric: '-32%',
        priority: 'critical',
        type: 'risk'
      },
      {
        id: 3,
        agency: '지금용코리아',
        branch: '대원',
        tag: '핵심인력 해촉',
        reason: '지난달 가동 설계사 2명 해촉',
        metric: '2명 해촉',
        priority: 'critical',
        type: 'risk'
      },
      {
        id: 4,
        agency: '더블유에셋',
        branch: '일산센터',
        tag: '계약 품질 이슈',
        reason: '당월 인수거절/청약철회 4건 발생',
        metric: '4건 발생',
        priority: 'high',
        type: 'risk'
      },
      {
        id: 5,
        agency: '한국파이낸셜그룹',
        branch: '강남점',
        tag: '활동 중단',
        reason: '지난달 실적 있었으나 당월 APE 없음',
        metric: '0원',
        priority: 'critical',
        type: 'risk'
      }
    ],
    opportunities: [
      {
        id: 6,
        agency: '글로벌금융판매',
        branch: '리더스일산',
        tag: '실적 급상승',
        reason: '전월 동기 대비 APE +45% 급등',
        metric: '+45%',
        priority: 'opportunity',
        type: 'opportunity'
      },
      {
        id: 7,
        agency: '한국지에이금융서비스',
        branch: '일산지사',
        tag: '목표 초과 달성',
        reason: '당월 목표 125% 달성',
        metric: '125%',
        priority: 'opportunity',
        type: 'opportunity'
      },
      {
        id: 8,
        agency: '어센틱금융그룹',
        branch: '구미 스튜디오',
        tag: '고액 계약 체결',
        reason: '월 보험료 35만원 고액계약 체결',
        metric: '35만원',
        priority: 'opportunity',
        type: 'opportunity'
      },
      {
        id: 9,
        agency: '메가금융판매',
        branch: '서울본점',
        tag: '신규 위촉',
        reason: '이번 달 신규 설계사 3명 위촉',
        metric: '3명 위촉',
        priority: 'opportunity',
        type: 'opportunity'
      },
      {
        id: 10,
        agency: '라이프파트너스',
        branch: '부산센터',
        tag: '신규 가동',
        reason: '신규 설계사 2명이 첫 계약 성공',
        metric: '2명 가동',
        priority: 'opportunity',
        type: 'opportunity'
      }
    ]
  };

  const getKPIData = () => {
    return (monthlyTrend as any)[selectedYear][selectedKPI];
  };
  
  const getMaxValue = (data: any[], kpi: string) => {
    // 동적 스케일링: 데이터의 최대값에 여백 추가
    const values = data.map((d: any) => Math.max(d.value, d.hqAvg));
    const maxValue = Math.max(...values);
    return Math.ceil(maxValue * 1.1); // 최대값의 110%로 스케일링
  };
  
  const [hoveredData, setHoveredData] = useState<any>(null);
  const [showExpectedProgressTooltip, setShowExpectedProgressTooltip] = useState(false);
  const [hoveredDayData, setHoveredDayData] = useState<any>(null);
  const [branchSortBy, setBranchSortBy] = useState('achievement');
  const [branchSortOrder, setBranchSortOrder] = useState<'desc' | 'asc'>('desc');
  const [showCriteriaTooltip, setShowCriteriaTooltip] = useState(false);
  const [branchPeriod, setBranchPeriod] = useState<'current' | 'previous'>('current');
  const [showAllBranchesModal, setShowAllBranchesModal] = useState(false);
  const [showBranchInfoModal, setBranchInfoModal] = useState(false);
  const [modalSortBy, setModalSortBy] = useState('achievement');
  const [modalSortOrder, setModalSortOrder] = useState<'desc' | 'asc'>('desc');
  const [tempSelectedMonth, setTempSelectedMonth] = useState('2025-09'); // 드롭다운에서 선택한 월
  const [appliedMonth, setAppliedMonth] = useState('2025-09'); // 실제 적용된 월
  const [expandedRecommendations, setExpandedRecommendations] = useState(false);

  // 현재 날짜 기준으로 실시간 데이터인지 판단
  const isCurrentMonth = appliedMonth === '2025-09';

  // 조회 버튼 클릭 핸들러
  const handleSearchClick = () => {
    setAppliedMonth(tempSelectedMonth);
  };

  // 과거 월 데이터 생성 함수
  const getHistoricalKPI = (month: string) => {
    if (month === '2025-09') return myKPIDefault; // 현재 월

    // 과거 월별 다른 데이터 반환
    const historicalData: { [key: string]: typeof myKPIDefault } = {
      '2025-08': {
        goalAchievement: {
          current: 95.2,
          target: 50000,
          actual: 47600,
          hqAvg: 88.7,
          vsLastMonth: 18.3,
          gap: 2400,
          dailyRequired: 0, // 완료된 월이므로 0
          hqRankTotal: { rank: 5, total: 50 },
          hqRankRegion: { rank: 2, total: 10 }
        },
        designerActivity: {
          current: 72.8,
          active: 510,
          total: 700,
          hqAvg: 69.1,
          vsLastMonth: 15,
          vsLastMonthPercent: 7.2,
          plan: 450,
          planAchievement: 113.3
        },
        mobileContract: {
          current: 52.3,
          count: 142,
          total: 271,
          hqAvg: 48.9,
          vsLastMonth: 39,
          vsLastMonthPercent: 6.5
        }
      },
      '2025-07': {
        goalAchievement: {
          current: 88.5,
          target: 45000,
          actual: 39825,
          hqAvg: 82.1,
          vsLastMonth: 15.7,
          gap: 5175,
          dailyRequired: 0,
          hqRankTotal: { rank: 7, total: 50 },
          hqRankRegion: { rank: 3, total: 10 }
        },
        designerActivity: {
          current: 68.4,
          active: 479,
          total: 700,
          hqAvg: 65.8,
          vsLastMonth: 8,
          vsLastMonthPercent: 4.1,
          plan: 450,
          planAchievement: 106.4
        },
        mobileContract: {
          current: 48.9,
          count: 127,
          total: 260,
          hqAvg: 45.2,
          vsLastMonth: 24,
          vsLastMonthPercent: 5.1
        }
      }
    };

    return historicalData[month] || myKPIDefault;
  };

  // 선택된 월에 따른 myKPI 데이터
  myKPI = getHistoricalKPI(appliedMonth);

  // 3년치 월 옵션 생성 (2023년 1월부터 2025년 9월까지)
  const monthOptions = [];
  for (let year = 2025; year >= 2023; year--) {
    const endMonth = year === 2025 ? 9 : 12;
    const startMonth = year === 2023 ? 1 : 1;
    for (let month = endMonth; month >= startMonth; month--) {
      const value = `${year}-${String(month).padStart(2, '0')}`;
      const label = `${year}년 ${month}월`;
      monthOptions.push({ value, label });
    }
  }

  // 지점 순위 데이터
  const getBranchRankings = (getAllData = false) => {
    const currentMonthData = [
      { agency: '글로벌금융판매', branch: '글로벌화이브스타', achievement: 115.2, ape: 145.7, previousApe: 132.3, isActive: true },
      { agency: '글로벌금융판매', branch: '하나돔', achievement: 112.8, ape: 138.2, previousApe: 95.8, isActive: true },
      { agency: '글로벌금융판매', branch: '리더스에프엔', achievement: 108.5, ape: 132.9, previousApe: 118.5, isActive: true },
      { agency: '지금용코리아', branch: '서울', achievement: 105.7, ape: 128.1, previousApe: 85.4, isActive: true },
      { agency: '메타리치', branch: '보험스토어', achievement: 103.2, ape: 125.6, previousApe: 102.7, isActive: true },
      { agency: '더블유에셋', branch: '일산센터', achievement: 101.5, ape: 122, isActive: true },
      { agency: '글로벌금융판매', branch: '하나돔강북', achievement: 98.9, ape: 118, isActive: true },
      { agency: '글로벌금융판매', branch: '리더스일산', achievement: 96.4, ape: 115, isActive: true },
      { agency: '지금용코리아', branch: '대원', achievement: 94.7, ape: 112, isActive: true },
      { agency: '한국지에이금융서비스', branch: '일산지사', achievement: 92.1, ape: 108, isActive: true },
      { agency: '글로벌금융판매', branch: '화이브스타성화', achievement: 89.8, ape: 105, isActive: true },
      { agency: '글로벌금융판매', branch: '리더스마이보험체크', achievement: 87.5, ape: 102, isActive: true },
      { agency: '글로벌금융판매', branch: '이센트럴마포', achievement: 85.2, ape: 98, isActive: true },
      { agency: '글로벌금융판매', branch: '케이엘아이은평', achievement: 83.1, ape: 95, isActive: true },
      { agency: '글로벌금융판매', branch: '케이엘아이운정', achievement: 80.9, ape: 92, isActive: true },
      { agency: '지금용코리아', branch: '그레이트탑', achievement: 92.5, ape: 168, isActive: true },
      { agency: '지금용코리아', branch: '사랑', achievement: 89.2, ape: 162, isActive: true },
      { agency: '메타리치', branch: '골드자산관리센터', achievement: 86.7, ape: 158, isActive: true },
      { agency: '메타리치', branch: '리치골드', achievement: 84.3, ape: 155, isActive: true },
      { agency: '지에이스타금융서비스', branch: '부천코어', achievement: 82.1, ape: 152, isActive: true },
      { agency: '더블유에셋', branch: '1인지에이 일산2센터', achievement: 78.9, ape: 182, isActive: true },
      { agency: '더블유에셋', branch: '기업금융본부', achievement: 76.4, ape: 175, isActive: true },
      { agency: '글로벌금융판매', branch: '케이에스드래곤슬', achievement: 74.2, ape: 172, isActive: true },
      { agency: '글로벌금융판매', branch: '케이에스드래곤행신', achievement: 72.8, ape: 168, isActive: true },
      { agency: '글로벌금융판매', branch: '수도디아이씨', achievement: 70.5, ape: 165, isActive: true },
      { agency: '글로벌금융판매', branch: '글로벌인슈몽산', achievement: 95.8, ape: 188, isActive: true },
      { agency: '글로벌금융판매', branch: '글로벌인슈고양', achievement: 93.4, ape: 185, isActive: true },
      { agency: '글로벌금융판매', branch: '글로벌인슈에이치', achievement: 91.2, ape: 182, isActive: true },
      { agency: '글로벌금융판매', branch: '브릿지재무설계', achievement: 88.9, ape: 178, isActive: true },
      { agency: '글로벌금융판매', branch: '인스라이트서클강북', achievement: 86.7, ape: 175, isActive: true }
    ];

    const previousMonthData = [
      { agency: '메타리치', branch: '골드자산관리센터', achievement: 118.5, ape: 195, isActive: true },
      { agency: '글로벌금융판매', branch: '리더스에이치비', achievement: 116.2, ape: 142, isActive: true },
      { agency: '지에이스타금융서비스', branch: '부천코어', achievement: 114.8, ape: 190, isActive: true },
      { agency: '더블유에셋', branch: '서울지사', achievement: 112.3, ape: 138, isActive: true },
      { agency: '한국지에이금융서비스', branch: '일산지사', achievement: 110.1, ape: 185, isActive: true },
      { agency: '글로벌금융판매', branch: '케이엘아이케이베스트', achievement: 108.9, ape: 135, isActive: true },
      { agency: '메타리치', branch: '리치골드', achievement: 107.5, ape: 180, isActive: true },
      { agency: '지금용코리아', branch: '그레이트탑', achievement: 106.2, ape: 132, isActive: true },
      { agency: '더블유에셋', branch: '기업금융본부', achievement: 104.8, ape: 175, isActive: true },
      { agency: '글로벌금융판매', branch: '브릿지재무설계', achievement: 103.5, ape: 128, isActive: true },
      { agency: '글로벌금융판매', branch: '굿브즈스카이', achievement: 102.1, ape: 172, isActive: true },
      { agency: '글로벌금융판매', branch: '인슈에셋자오선', achievement: 100.8, ape: 125, isActive: true },
      { agency: '메타리치', branch: '보험스토어A', achievement: 99.4, ape: 168, isActive: true },
      { agency: '지금용코리아', branch: '서울A', achievement: 98.1, ape: 165, isActive: true },
      { agency: '지금용코리아', branch: '대원A', achievement: 96.8, ape: 122, isActive: true },
      { agency: '지금용코리아', branch: '그레이트탑A', achievement: 95.4, ape: 162, isActive: true },
      { agency: '지금용코리아', branch: '사랑A', achievement: 94.1, ape: 118, isActive: true },
      { agency: '더블유에셋', branch: '일산센터A', achievement: 92.8, ape: 158, isActive: true },
      { agency: '더블유에셋', branch: '서울지사A', achievement: 91.4, ape: 155, isActive: true },
      { agency: '더블유에셋', branch: '기업금융본부A', achievement: 90.1, ape: 115, isActive: true },
      { agency: '한국지에이금융서비스', branch: '일산지사A', achievement: 88.8, ape: 152, isActive: true },
      { agency: '메가', branch: '인슈에셋고양', achievement: 87.4, ape: 148, isActive: true },
      { agency: '메가', branch: '인슈에셋고양A', achievement: 86.1, ape: 112, isActive: true },
      { agency: '글로벌금융판매', branch: '하나돔A', achievement: 84.8, ape: 145, isActive: true },
      { agency: '글로벌금융판매', branch: '하나돔강북A', achievement: 83.4, ape: 108, isActive: true },
      { agency: '글로벌금융판매', branch: '리더스에프엔A', achievement: 82.1, ape: 142, isActive: true },
      { agency: '글로벌금융판매', branch: '리더스에이치비A', achievement: 80.8, ape: 105, isActive: true },
      { agency: '글로벌금융판매', branch: '리더스마이보험A', achievement: 79.4, ape: 102, isActive: true },
      { agency: '글로벌금융판매', branch: '리더스일산A', achievement: 78.1, ape: 98, isActive: true },
      { agency: '글로벌금융판매', branch: '케이엘아이케이베스트A', achievement: 76.8, ape: 95, isActive: true }
    ];
    
    // 현재 선택된 기간에 따라 데이터 선택
    const baseData = branchPeriod === 'current' ? currentMonthData : previousMonthData;
    
    // 160개 지점까지 확장 (고정된 데이터)
    const additionalBranches = [];
    const agencies = ['지금용코리아', '글로벌금융판매', '메타리치', '지에이스타금융서비스', '더블유에셋', '한국지에이금융서비스', '메가'];
    const branchNames = ['서울', '대원', '그레이트탑', '사랑', '케이엘아이케이베스트', '글로벌화이브스타', '화이브스타성화', '하나돔', '하나돔강북', '리더스에프엔', '리더스에이치비', '리더스마이보험체크', '리더스일산', '리더스마이보험', '이센트럴마포', '케이에스에프에스동대문', '케이에스에프에스군자', '케이엘아이은평', '케이엘아이운정', '지금용', '케이에스드래곤슬', '케이에스드래곤행신', '수도디아이씨', '글로벌인슈몽산', '글로벌인슈고양', '글로벌인슈에이치', '브릿지재무설계', '인스라이트서클강북', '굿브즈스카이', '인슈에셋자오선', '보험스토어', '골드자산관리센터', '리치골드', '부천코어', '일산센터', '1인지에이 일산2센터', '서울지사', '기업금융본부', '일산지사', '인슈에셋고양'];
    
    // 당월/전월에 따라 총 지점 수와 가동 지점 수 설정
    const totalBranches = branchPeriod === 'current' ? 160 : 158;
    const activeBranchCount = branchPeriod === 'current' ? 95 : 120;
    
    for (let i = baseData.length; i < totalBranches; i++) {
      const agency = agencies[i % agencies.length];
      const suffixes = ['', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
      const branch = branchNames[i % branchNames.length] + suffixes[Math.floor(i / branchNames.length)];
      
      // 가동/비가동 구분 (일부 지점은 실적 없음)
      const isActive = i < activeBranchCount;
      
      if (isActive) {
        // 가동 지점 - 실적 있음
        let achievement, ape;
        if (branchPeriod === 'current') {
          achievement = Math.round((85 - (i * 0.4)) * 10) / 10; // 85%에서 점진적 감소
          ape = Math.round(180 - (i * 0.8)); // 180에서 점진적 감소
        } else {
          achievement = Math.round((88 - (i * 0.5)) * 10) / 10; // 전월은 약간 다른 패턴
          ape = Math.round(185 - (i * 0.9));
        }
        
        additionalBranches.push({ 
          agency, 
          branch, 
          achievement: Math.max(40, achievement), 
          ape: Math.max(60, ape),
          isActive: true
        });
      } else {
        // 비가동 지점 - 실적 없음
        additionalBranches.push({ 
          agency, 
          branch, 
          achievement: 0, 
          ape: 0,
          isActive: false
        });
      }
    }
    
    const allBranches = [...baseData, ...additionalBranches];
    
    // 가동 지점만 필터링 후 정렬 (정확히 95개)
    const activeBranches = allBranches.filter(branch => branch.isActive).slice(0, 95);

    // 실적 없는 지점 추가 (getAllData가 true일 때만)
    const inactiveBranches = getAllData ? [
      { agency: '글로벌금융판매', branch: '케이엘아이신촌', achievement: 0, ape: 0, isActive: false, target: 120 },
      { agency: '글로벌금융판매', branch: '하나팍스', achievement: 0, ape: 0, isActive: false, target: 120 },
      { agency: '메타리치', branch: '골드에셋센터', achievement: 0, ape: 0, isActive: false, target: 120 },
      { agency: '지금용코리아', branch: '강남센터', achievement: 0, ape: 0, isActive: false, target: 120 },
      { agency: '더블유에셋', branch: '분당지사', achievement: 0, ape: 0, isActive: false, target: 120 },
      { agency: '글로벌금융판매', branch: '리더스강서', achievement: 0, ape: 0, isActive: false, target: 120 },
      { agency: '한국지에이금융서비스', branch: '수원지사', achievement: 0, ape: 0, isActive: false, target: 120 },
      { agency: '지에이스타금융서비스', branch: '인천센터', achievement: 0, ape: 0, isActive: false, target: 120 },
      { agency: '메타리치', branch: '실버자산관리', achievement: 0, ape: 0, isActive: false, target: 120 },
      { agency: '글로벌금융판매', branch: '케이엘아이목동', achievement: 0, ape: 0, isActive: false, target: 120 },
      { agency: '더블유에셋', branch: '광화문센터', achievement: 0, ape: 0, isActive: false, target: 120 },
      { agency: '지금용코리아', branch: '부산지사', achievement: 0, ape: 0, isActive: false, target: 120 },
      { agency: '글로벌금융판매', branch: '하나돔영등포', achievement: 0, ape: 0, isActive: false, target: 120 },
      { agency: '메타리치', branch: '플래티넘센터', achievement: 0, ape: 0, isActive: false, target: 120 },
      { agency: '한국지에이금융서비스', branch: '대구지사', achievement: 0, ape: 0, isActive: false, target: 120 },
      { agency: '글로벌금융판매', branch: '리더스용산', achievement: 0, ape: 0, isActive: false, target: 120 },
      { agency: '지에이스타금융서비스', branch: '대전센터', achievement: 0, ape: 0, isActive: false, target: 120 },
      { agency: '더블유에셋', branch: '노원지사', achievement: 0, ape: 0, isActive: false, target: 120 },
      { agency: '메타리치', branch: '다이아몬드센터', achievement: 0, ape: 0, isActive: false, target: 120 },
      { agency: '글로벌금융판매', branch: '케이엘아이성북', achievement: 0, ape: 0, isActive: false, target: 120 },
      { agency: '지금용코리아', branch: '울산센터', achievement: 0, ape: 0, isActive: false, target: 120 },
      { agency: '한국지에이금융서비스', branch: '청주지사', achievement: 0, ape: 0, isActive: false, target: 120 },
      { agency: '글로벌금융판매', branch: '하나돔마포', achievement: 0, ape: 0, isActive: false, target: 120 },
      { agency: '메타리치', branch: '골드플러스센터', achievement: 0, ape: 0, isActive: false, target: 120 },
      { agency: '더블유에셋', branch: '송파지사', achievement: 0, ape: 0, isActive: false, target: 120 },
      { agency: '지에이스타금융서비스', branch: '광주센터', achievement: 0, ape: 0, isActive: false, target: 120 },
      { agency: '글로벌금융판매', branch: '리더스서초', achievement: 0, ape: 0, isActive: false, target: 120 },
      { agency: '지금용코리아', branch: '창원센터', achievement: 0, ape: 0, isActive: false, target: 120 },
      { agency: '한국지에이금융서비스', branch: '천안지사', achievement: 0, ape: 0, isActive: false, target: 120 },
      { agency: '메타리치', branch: '실버플러스센터', achievement: 0, ape: 0, isActive: false, target: 120 },
      { agency: '글로벌금융판매', branch: '케이엘아이동작', achievement: 0, ape: 0, isActive: false, target: 120 },
      { agency: '더블유에셋', branch: '일산제2지사', achievement: 0, ape: 0, isActive: false, target: 120 },
      { agency: '지에이스타금융서비스', branch: '전주센터', achievement: 0, ape: 0, isActive: false, target: 120 },
      { agency: '글로벌금융판매', branch: '하나돔관악', achievement: 0, ape: 0, isActive: false, target: 120 },
      { agency: '지금용코리아', branch: '포항센터', achievement: 0, ape: 0, isActive: false, target: 120 },
      { agency: '메타리치', branch: '프리미엄센터', achievement: 0, ape: 0, isActive: false, target: 120 },
      { agency: '한국지에이금융서비스', branch: '안양지사', achievement: 0, ape: 0, isActive: false, target: 120 },
      { agency: '글로벌금융판매', branch: '리더스구로', achievement: 0, ape: 0, isActive: false, target: 120 },
      { agency: '더블유에셋', branch: '강동지사', achievement: 0, ape: 0, isActive: false, target: 120 },
      { agency: '지에이스타금융서비스', branch: '순천센터', achievement: 0, ape: 0, isActive: false, target: 120 },
      { agency: '글로벌금융판매', branch: '케이엘아이중랑', achievement: 0, ape: 0, isActive: false, target: 120 },
      { agency: '메타리치', branch: '골드스타센터', achievement: 0, ape: 0, isActive: false, target: 120 },
      { agency: '지금용코리아', branch: '진주센터', achievement: 0, ape: 0, isActive: false, target: 120 },
      { agency: '한국지에이금융서비스', branch: '의정부지사', achievement: 0, ape: 0, isActive: false, target: 120 },
      { agency: '글로벌금융판매', branch: '하나돔은평', achievement: 0, ape: 0, isActive: false, target: 120 },
      { agency: '더블유에셋', branch: '성남지사', achievement: 0, ape: 0, isActive: false, target: 120 },
      { agency: '지에이스타금융서비스', branch: '목포센터', achievement: 0, ape: 0, isActive: false, target: 120 },
      { agency: '메타리치', branch: '다이아플러스센터', achievement: 0, ape: 0, isActive: false, target: 120 },
      { agency: '글로벌금융판매', branch: '리더스금천', achievement: 0, ape: 0, isActive: false, target: 120 },
      { agency: '지금용코리아', branch: '여수센터', achievement: 0, ape: 0, isActive: false, target: 120 },
      { agency: '한국지에이금융서비스', branch: '평택지사', achievement: 0, ape: 0, isActive: false, target: 120 },
      { agency: '더블유에셋', branch: '구리지사', achievement: 0, ape: 0, isActive: false, target: 120 },
      { agency: '글로벌금융판매', branch: '케이엘아이도봉', achievement: 0, ape: 0, isActive: false, target: 120 },
      { agency: '지에이스타금융서비스', branch: '안동센터', achievement: 0, ape: 0, isActive: false, target: 120 },
      { agency: '메타리치', branch: '프리미엄플러스센터', achievement: 0, ape: 0, isActive: false, target: 120 },
      { agency: '글로벌금융판매', branch: '하나돔성동', achievement: 0, ape: 0, isActive: false, target: 120 },
      { agency: '지금용코리아', branch: '통영센터', achievement: 0, ape: 0, isActive: false, target: 120 },
      { agency: '한국지에이금융서비스', branch: '김포지사', achievement: 0, ape: 0, isActive: false, target: 120 },
      { agency: '더블유에셋', branch: '하남지사', achievement: 0, ape: 0, isActive: false, target: 120 },
      { agency: '글로벌금융판매', branch: '리더스양천', achievement: 0, ape: 0, isActive: false, target: 120 },
      { agency: '지에이스타금융서비스', branch: '구미센터', achievement: 0, ape: 0, isActive: false, target: 120 },
      { agency: '메타리치', branch: '골드프리미엄센터', achievement: 0, ape: 0, isActive: false, target: 120 },
      { agency: '글로벌금융판매', branch: '케이엘아이강북', achievement: 0, ape: 0, isActive: false, target: 120 },
      { agency: '지금용코리아', branch: '밀양센터', achievement: 0, ape: 0, isActive: false, target: 120 },
      { agency: '한국지에이금융서비스', branch: '파주지사', achievement: 0, ape: 0, isActive: false, target: 120 },
      { agency: '더블유에셋', branch: '남양주지사', achievement: 0, ape: 0, isActive: false, target: 120 }
    ] : [];

    const allBranchesToShow = getAllData ? [...activeBranches, ...inactiveBranches] : activeBranches;

    const sorted = allBranchesToShow.sort((a, b) => {
      let comparison = 0;
      
      // 확장 시에도 현재 정렬 기준 사용
      if (getAllData) {
        const sortBy = branchSortBy;
        const sortOrder = branchSortOrder;
        
        if (sortBy === 'achievement') {
          comparison = b.achievement - a.achievement;
        } else if (sortBy === 'ape') {
          comparison = b.ape - a.ape;
        } else if (sortBy === 'target') {
          comparison = (b.target || 120) - (a.target || 120);
        }
        
        return sortOrder === 'desc' ? comparison : -comparison;
      } else {
        // TOP5에서도 다양한 정렬 기준 지원
        if (branchSortBy === 'achievement') {
          comparison = b.achievement - a.achievement;
        } else if (branchSortBy === 'ape') {
          comparison = b.ape - a.ape;
        } else if (branchSortBy === 'target') {
          comparison = (b.target || 120) - (a.target || 120);
        }
        return branchSortOrder === 'desc' ? comparison : -comparison;
      }
    });
    
    // 가동 현황 정보를 함께 반환
    const totalBranchesForStats = branchPeriod === 'current' ? 160 : 158;
    const activeBranchesCountForStats = branchPeriod === 'current' ? 95 : 120;
    const activityRate = Math.round((activeBranchesCountForStats / totalBranchesForStats) * 1000) / 10;
    
    const result = getAllData ? sorted : sorted.slice(0, 5);

    // 가동 현황 정보와 함께 반환
    return {
      data: result,
      branchStats: {
        total: totalBranchesForStats,
        active: activeBranchesCountForStats,
        activityRate: activityRate
      }
    } as any;
  };
  
  // 일별 데이터 - 상품군별로 다른 패턴
  const getDailyData = () => {
    const baseData = {
      '전체': [
        { day: 1, apeAmount: 15, contractCount: 12, isWeekend: false },
        { day: 2, apeAmount: 8, contractCount: 18, isWeekend: false },
        { day: 3, apeAmount: 24, contractCount: 7, isWeekend: false },
        { day: 4, apeAmount: 22, contractCount: 16, isWeekend: false },
        { day: 5, apeAmount: 6, contractCount: 14, isWeekend: false },
        { day: 6, apeAmount: 28, contractCount: 9, isWeekend: false },
        { day: 7, apeAmount: 0, contractCount: 0, isWeekend: true },
        { day: 8, apeAmount: 0, contractCount: 0, isWeekend: true },
        { day: 9, apeAmount: 12, contractCount: 20, isWeekend: false },
        { day: 10, apeAmount: 32, contractCount: 8, isWeekend: false },
        { day: 11, apeAmount: 9, contractCount: 22, isWeekend: false },
        { day: 12, apeAmount: 26, contractCount: 11, isWeekend: false },
        { day: 13, apeAmount: 5, contractCount: 15, isWeekend: false },
        { day: 14, apeAmount: 0, contractCount: 0, isWeekend: true },
        { day: 15, apeAmount: 0, contractCount: 0, isWeekend: true },
        { day: 16, apeAmount: 18, contractCount: 13, isWeekend: false },
        { day: 17, apeAmount: 4, contractCount: 19, isWeekend: false },
        { day: 18, apeAmount: 35, contractCount: 10, isWeekend: false },
        { day: 19, apeAmount: 14, contractCount: 16, isWeekend: false },
        { day: 20, apeAmount: 7, contractCount: 21, isWeekend: false }
      ],
      '건강': [
        { day: 1, apeAmount: 8, contractCount: 9, isWeekend: false },
        { day: 2, apeAmount: 5, contractCount: 12, isWeekend: false },
        { day: 3, apeAmount: 12, contractCount: 5, isWeekend: false },
        { day: 4, apeAmount: 15, contractCount: 11, isWeekend: false },
        { day: 5, apeAmount: 4, contractCount: 10, isWeekend: false },
        { day: 6, apeAmount: 18, contractCount: 6, isWeekend: false },
        { day: 7, apeAmount: 0, contractCount: 0, isWeekend: true },
        { day: 8, apeAmount: 0, contractCount: 0, isWeekend: true },
        { day: 9, apeAmount: 9, contractCount: 14, isWeekend: false },
        { day: 10, apeAmount: 22, contractCount: 5, isWeekend: false },
        { day: 11, apeAmount: 6, contractCount: 15, isWeekend: false },
        { day: 12, apeAmount: 16, contractCount: 8, isWeekend: false },
        { day: 13, apeAmount: 3, contractCount: 11, isWeekend: false },
        { day: 14, apeAmount: 0, contractCount: 0, isWeekend: true },
        { day: 15, apeAmount: 0, contractCount: 0, isWeekend: true },
        { day: 16, apeAmount: 11, contractCount: 9, isWeekend: false },
        { day: 17, apeAmount: 2, contractCount: 13, isWeekend: false },
        { day: 18, apeAmount: 25, contractCount: 7, isWeekend: false },
        { day: 19, apeAmount: 9, contractCount: 12, isWeekend: false },
        { day: 20, apeAmount: 4, contractCount: 14, isWeekend: false }
      ],
      '종신/정기': [
        { day: 1, apeAmount: 7, contractCount: 3, isWeekend: false },
        { day: 2, apeAmount: 3, contractCount: 6, isWeekend: false },
        { day: 3, apeAmount: 12, contractCount: 2, isWeekend: false },
        { day: 4, apeAmount: 7, contractCount: 5, isWeekend: false },
        { day: 5, apeAmount: 2, contractCount: 4, isWeekend: false },
        { day: 6, apeAmount: 10, contractCount: 3, isWeekend: false },
        { day: 7, apeAmount: 0, contractCount: 0, isWeekend: true },
        { day: 8, apeAmount: 0, contractCount: 0, isWeekend: true },
        { day: 9, apeAmount: 3, contractCount: 6, isWeekend: false },
        { day: 10, apeAmount: 10, contractCount: 3, isWeekend: false },
        { day: 11, apeAmount: 3, contractCount: 7, isWeekend: false },
        { day: 12, apeAmount: 10, contractCount: 3, isWeekend: false },
        { day: 13, apeAmount: 2, contractCount: 4, isWeekend: false },
        { day: 14, apeAmount: 0, contractCount: 0, isWeekend: true },
        { day: 15, apeAmount: 0, contractCount: 0, isWeekend: true },
        { day: 16, apeAmount: 7, contractCount: 4, isWeekend: false },
        { day: 17, apeAmount: 2, contractCount: 6, isWeekend: false },
        { day: 18, apeAmount: 10, contractCount: 3, isWeekend: false },
        { day: 19, apeAmount: 5, contractCount: 4, isWeekend: false },
        { day: 20, apeAmount: 3, contractCount: 7, isWeekend: false }
      ]
    };
    return (baseData as any)[selectedProduct] || baseData['전체'];
  };
  
  // 필터별 데이터
  const getFilteredData = (key: string) => {
    const baseData = {
      ape: { '전체': 31000, '건강': 20100, '종신/정기': 10900 }, // 만원 단위
      dailyApe: { '전체': 1600, '건강': 1100, '종신/정기': 500 }, // 만원 단위
      apeGrowth: { '전체': 15.3, '건강': 18.7, '종신/정기': 11.2 },
      apeGrowthAmount: { '전체': 4100, '건강': 3200, '종신/정기': 900 }, // 전월 동기 대비 절대 증가분 (만원)
      dailyApeAmount: { '전체': 1600, '건강': 1100, '종신/정기': 500 },
      apeRatio: { '전체': 100, '건강': 65, '종신/정기': 35 },
      dailyApeGrowth: { '전체': 8.7, '건강': 12.3, '종신/정기': 5.8 },
      design: { '전체': 380, '건강': 248, '종신/정기': 132 },
      dailyDesign: { '전체': 25, '건강': 16, '종신/정기': 9 },
      designGrowth: { '전체': -8, '건강': -5, '종신/정기': -3 },
      contract: { '전체': 225, '건강': 146, '종신/정기': 79 },
      dailyContract: { '전체': 15, '건강': 10, '종신/정기': 5 },
      contractGrowth: { '전체': 12, '건강': 18, '종신/정기': 8 }
    };
    return (baseData as any)[key][selectedProduct] || 0;
  };
  
  // 상품 포트폴리오 데이터
  const getPortfolioData = () => {
    if (selectedProduct === '전체') {
      return [
        { name: '건강보험', value: 65, color: '#3b82f6' },
        { name: '종신/정기', value: 35, color: '#10b981' }
      ];
    } else if (selectedProduct === '건강') {
      return [
        { name: '치아', value: 45, color: '#3b82f6' },
        { name: '암', value: 30, color: '#60a5fa' },
        { name: '골담보', value: 15, color: '#93c5fd' },
        { name: '치매', value: 10, color: '#bfdbfe' }
      ];
    } else {
      return [
        { name: '저해지 간편고지체', value: 25, color: '#10b981' },
        { name: '저해지 표준체', value: 22, color: '#34d399' },
        { name: '무해지 간편고지체', value: 20, color: '#6ee7b7' },
        { name: '무해지 표준체', value: 18, color: '#a7f3d0' },
        { name: '정기보험', value: 15, color: '#d1fae5' }
      ];
    }
  };
  
  // Top 3 상품 데이터
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

  // 지점 클릭 핸들러
  const handleBranchClick = (agency: string, branchName: string) => {
    const encodedAgency = encodeURIComponent(agency);
    const encodedBranch = encodeURIComponent(branchName);
    navigate(`/branch/${encodedAgency}/${encodedBranch}`);
  };

  // 방문 추천 지점 클릭 핸들러
  const handleVisitBranchClick = (agency: string, branchName: string) => {
    const encodedAgency = encodeURIComponent(agency);
    const encodedBranch = encodeURIComponent(branchName);
    navigate(`/branch/${encodedAgency}/${encodedBranch}`);
  };

  // 지점 360° 상세 분석 버튼 클릭 핸들러 (첫 번째 지점으로 이동)
  const handleBranchDetailClick = () => {
    const firstBranch = getBranchRankings().data[0];
    if (firstBranch) {
      handleBranchClick(firstBranch.agency, firstBranch.branch);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">

      {/* Header */}
      <div className="bg-white border-b sticky top-0 z-10">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-xl font-bold text-gray-900">통합 인사이트 뷰</h1>
              <p className="text-sm text-gray-600 mt-1">
                강남본부 김영수 지점장 |
                {isCurrentMonth ? (
                  <> 9/19 마감 데이터 기준</>
                ) : (
                  <> {appliedMonth.split('-')[0]}년 {parseInt(appliedMonth.split('-')[1])}월 마감 데이터 기준</>
                )}
              </p>
            </div>
            <div className="flex items-center gap-4">
              {isCurrentMonth && (
                <span className="text-xs text-gray-500">
                  2025.09.20(금) | 9월 영업일: {businessDays.elapsed}일/{businessDays.total}일 (잔여 {businessDays.remaining}일)
                </span>
              )}
              <div className="flex items-center gap-1">
                <select
                  value={tempSelectedMonth}
                  onChange={(e) => setTempSelectedMonth(e.target.value)}
                  className="px-2 py-1 text-xs border border-gray-300 rounded bg-white focus:outline-none focus:border-gray-400"
                >
                  {monthOptions.map(option => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
                <button
                  onClick={handleSearchClick}
                  className="px-2 py-1 text-xs bg-gray-300 text-gray-700 rounded hover:bg-gray-400 transition-colors"
                >
                  조회
                </button>
              </div>
              <button className="flex items-center gap-2 px-3 py-2 text-sm bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors">
                <Download className="w-4 h-4" />
                원클릭 엑셀 다운로드
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="p-6">
        <div className="grid grid-cols-3 gap-6 items-start">
          
          {/* ① 나의 성과 현황 */}
          <div className="space-y-4">
            <h2 className="text-lg font-bold text-gray-900 flex items-center">
              <Trophy className="w-5 h-5 text-yellow-500 mr-2" />
              나의 성과 현황
            </h2>
            
            {/* 목표달성률 (APE 기준) - 주요 지표 */}
            <div className="bg-white rounded-lg shadow-sm border p-6">
              <h3 className="text-base font-bold text-gray-800 mb-4 border-b border-gray-100 pb-2">목표달성률 (APE 기준)</h3>
              
              <div className="text-center mb-4">
                <div className="text-5xl font-black text-blue-600 mb-2">{myKPI.goalAchievement.current.toFixed(1)}%</div>
                <div className="text-lg text-gray-600 font-medium mb-4">
                  {formatCurrency(myKPI.goalAchievement.actual * 10000)} / {formatCurrency(myKPI.goalAchievement.target * 10000)}
                </div>

                <div className="w-full bg-gray-200 rounded-full h-5 mb-2 relative">
                  <div className="bg-blue-500 h-5 rounded-full transition-all" style={{width: `${myKPI.goalAchievement.current}%`}}></div>
                  {/* 기대 진도선 (15일/22일 = 68.2%) */}
                  <div
                    className="absolute top-0 h-5 w-0.5 bg-orange-500 z-10 cursor-pointer"
                    style={{left: `${(businessDays.elapsed/businessDays.total)*100}%`}}
                    onMouseEnter={() => setShowExpectedProgressTooltip(true)}
                    onMouseLeave={() => setShowExpectedProgressTooltip(false)}
                  />
                  {/* 기대 진도 호버 영역 확대 */}
                  <div
                    className="absolute top-0 h-5 w-4 z-10 cursor-pointer"
                    style={{left: `${(businessDays.elapsed/businessDays.total)*100}%`, transform: 'translateX(-50%)'}}
                    onMouseEnter={() => setShowExpectedProgressTooltip(true)}
                    onMouseLeave={() => setShowExpectedProgressTooltip(false)}
                  />
                  {/* 기대 진도 툴팁 */}
                  {showExpectedProgressTooltip && (
                    <div
                      className="absolute top-6 bg-gray-800 text-white text-xs rounded px-3 py-2 whitespace-nowrap z-20 shadow-lg"
                      style={{left: `${(businessDays.elapsed/businessDays.total)*100}%`, transform: 'translateX(-50%)'}}
                    >
                      <div className="font-bold mb-1">기대진도 {Math.round((businessDays.elapsed/businessDays.total)*100)}%</div>
                      <div className="text-gray-300">영업일 기준: {businessDays.elapsed}일/{businessDays.total}일</div>
                    </div>
                  )}
                </div>

                <div className="mb-4 h-4"></div>
              </div>
              
              <div className="grid grid-cols-2 gap-3 mb-4">
                <div className="text-left">
                  <div className="text-xs text-gray-500 mb-1">전월 동기 대비</div>
                  <div className={`font-semibold text-lg ${myKPI.goalAchievement.vsLastMonth > 0 ? 'text-green-600' : 'text-red-600'}`}>
                    {myKPI.goalAchievement.vsLastMonth > 0 ? '▲ ' : '▼ '}{Math.abs(myKPI.goalAchievement.vsLastMonth)}%p
                  </div>
                  <div className={`text-xs ${myKPI.goalAchievement.vsLastMonth > 0 ? 'text-green-600' : 'text-red-600'}`}>
                    {myKPI.goalAchievement.vsLastMonth > 0 ? '+' : ''}{formatCurrency((myKPI.goalAchievement.actual * myKPI.goalAchievement.vsLastMonth / 100) * 10000)}
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-xs text-gray-500 mb-1">목표까지</div>
                  <div className="font-semibold text-lg text-gray-900">{formatCurrency(myKPI.goalAchievement.gap * 10000)}</div>
                  <div className="text-xs text-gray-500">
                    {myKPI.goalAchievement.actual >= myKPI.goalAchievement.target ? '목표 달성!' : '남은 금액'}
                  </div>
                </div>
              </div>

              {/* 강남본부 평균 별도 표시 */}
              <div className="bg-yellow-50 rounded-lg p-3 mb-4 border border-yellow-100">
                <div className="text-center">
                  <div className="text-xs text-yellow-600 font-medium mb-1">강남본부 평균</div>
                  <div className="text-lg font-bold text-yellow-700">{myKPI.goalAchievement.hqAvg}%</div>
                </div>
              </div>

              {/* 하루 평균 필요 금액 안내 - 현재월에만 표시 */}
              {isCurrentMonth && (
                <div className="bg-gray-50 rounded-lg p-3 border border-gray-200">
                  <div className="text-sm text-gray-700 text-center">이번달 목표 달성을 위해 하루 평균 <span className="font-semibold text-blue-600">{formatCurrency(myKPI.goalAchievement.dailyRequired * 10000)}</span>이 필요해요!</div>
                </div>
              )}
              
              <div className="grid grid-cols-2 gap-3 mt-4 pt-3 border-t">
                <div className="text-center">
                  <div className="text-xs text-gray-500">본부 순위</div>
                  <div className="font-semibold text-blue-600">{myKPI.goalAchievement.hqRankRegion.rank}위<span className="text-gray-500">/{myKPI.goalAchievement.hqRankRegion.total}명</span></div>
                </div>
                <div className="text-center">
                  <div className="text-xs text-gray-500">전체 순위</div>
                  <div className="font-semibold text-blue-600">{myKPI.goalAchievement.hqRankTotal.rank}위<span className="text-gray-500">/{myKPI.goalAchievement.hqRankTotal.total}명</span></div>
                </div>
              </div>
            </div>

            {/* 설계사 가동률 & 모바일 청약률 - 보조 지표 */}
            <div className="grid grid-cols-2 gap-3">
              <div className="bg-white rounded-lg shadow-sm border p-4">
                <h4 className="text-sm font-semibold text-gray-700 mb-3">설계사 가동률</h4>
                <div className="text-center mb-3">
                  <div className="text-2xl font-bold text-blue-600">{myKPI.designerActivity.current.toFixed(1)}%</div>
                  <div className="text-xs text-gray-500">({myKPI.designerActivity.active}/{myKPI.designerActivity.total}명)</div>
                </div>
                <div className="text-center">
                  <span className="text-xs text-gray-600">전월 동기 대비 </span>
                  <span className="text-sm font-medium text-red-600">▼ 3명</span>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow-sm border p-4">
                <h4 className="text-sm font-semibold text-gray-700 mb-3">모바일 청약률</h4>
                <div className="text-center mb-3">
                  <div className="text-2xl font-bold text-blue-600">{myKPI.mobileContract.current.toFixed(1)}%</div>
                  <div className="text-xs text-gray-500">({myKPI.mobileContract.count}/{myKPI.mobileContract.total}건)</div>
                </div>
                <div className="text-center">
                  <span className="text-xs text-gray-600">전월 동기 대비 </span>
                  <span className="text-sm font-medium text-green-600">▲ {myKPI.mobileContract.vsLastMonthPercent}%p</span>
                </div>
              </div>
            </div>

            {/* 월별 성과 추이 */}
            <div className="bg-white rounded-lg shadow-sm border p-4">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-semibold text-gray-700">월별 성과 추이</h3>
                
                <div className="space-y-2">
                  {/* KPI 선택 - 토글 버튼 스타일 */}
                  <div className="flex bg-gray-100 rounded-lg p-1">
                    {[
                      { key: 'nb_plan', label: '목표달성률' },
                      { key: 'activity_plan', label: '설계사 가동률' },
                      { key: 'mobile_contract', label: '모바일 청약률' }
                    ].map(kpi => (
                      <button
                        key={kpi.key}
                        onClick={() => setSelectedKPI(kpi.key)}
                        className={`px-3 py-1 text-xs font-medium rounded transition-colors ${
                          selectedKPI === kpi.key
                            ? 'bg-white text-gray-900 shadow-sm'
                            : 'text-gray-600 hover:text-gray-900'
                        }`}
                      >
                        {kpi.label}
                      </button>
                    ))}
                  </div>

                  {/* 년도 선택 */}
                  <div className="flex gap-1 justify-end">
                    {['2023', '2024', '2025'].map(year => (
                      <button
                        key={year}
                        onClick={() => setSelectedYear(year)}
                        className={`px-2 py-1 text-xs rounded ${
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
              
              <div className="h-52 relative bg-gray-50 rounded-lg p-4" onMouseLeave={() => setHoveredData(null)}>
                {/* % 표시 - 오른쪽 상단, 텍스트 겹침 방지 */}
                <div className="absolute top-2 right-2 text-xs text-gray-500 bg-gray-50 px-1">(%)</div>
                
                {/* 막대 그래프 */}
                <div className="flex items-end justify-center gap-3 h-full relative" style={{paddingTop: '20px'}}>
                  {getKPIData().map((data: any, idx: number) => {
                    const maxScale = getMaxValue(getKPIData(), selectedKPI);
                    const barHeight = Math.min((data.value / maxScale) * 120, 120); // 높이 줄여서 텍스트 공간 확보
                    const avgHeight = Math.min((data.hqAvg / maxScale) * 120, 120);
                    
                    return (
                      <div key={idx} className="flex flex-col items-center relative" style={{height: '160px', width: '50px'}}>
                        {/* 차트 영역 */}
                        <div className="relative flex justify-center" style={{height: '120px', width: '100%'}}>
                          {/* 본부 평균 노란선 */}
                          <div 
                            className="absolute border-t border-yellow-500 border-dashed z-10"
                            style={{bottom: `${avgHeight}px`, left: '-5px', right: '-5px'}}
                          />
                          
                          {/* 막대 */}
                          <div
                            className={`w-6 ${
                              data.value >= data.hqAvg ? 'bg-blue-500' : 'bg-red-400'
                            } rounded-t hover:opacity-80 transition-opacity cursor-pointer absolute bottom-0`}
                            style={{height: `${barHeight}px`}}
                            onMouseEnter={() => setHoveredData({...data, idx})}
                          />
                          
                          {/* 막대 바로 위 수치 */}
                          <div 
                            className="absolute text-xs text-gray-600 transform -translate-x-1/2 left-1/2"
                            style={{bottom: `${barHeight + 2}px`, fontSize: '10px'}}
                          >
                            {Math.round(data.value)}
                          </div>
                        </div>
                        
                        {/* 월 라벨 */}
                        <div className="text-xs text-gray-600 mt-2" style={{fontSize: '10px'}}>
                          {data.month}
                        </div>
                        
                        {/* 툴팁 */}
                        {hoveredData && hoveredData.idx === idx && (
                          <div className="absolute top-0 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xs rounded px-2 py-1 whitespace-nowrap z-20">
                            {selectedKPI === 'nb_plan' ? (
                              <div>
                                <div>{data.value}% ({data.actual}/{data.target}백만원)</div>
                                <div className="text-yellow-300">영업본부평균 {data.hqAvg}%</div>
                              </div>
                            ) : selectedKPI === 'activity_plan' ? (
                              <div>
                                <div>{data.value}% ({data.active}/{data.target}명)</div>
                                <div className="text-yellow-300">영업본부평균 {data.hqAvg}%</div>
                              </div>
                            ) : (
                              <div>
                                <div>{data.value}% ({data.count}/{data.total}건)</div>
                                <div className="text-yellow-300">영업본부평균 {data.hqAvg}%</div>
                              </div>
                            )}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
              
              <div className="flex items-center justify-center mt-4">
                <div className="flex items-center gap-4 text-xs">
                  <div className="flex items-center">
                    <div className="w-3 h-3 bg-blue-500 mr-1 rounded"></div>
                    <span>본부평균 이상</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-3 h-3 bg-red-400 mr-1 rounded"></div>
                    <span>본부평균 미달</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-6 h-0.5 bg-yellow-500 border-t-2 border-yellow-500 border-dashed mr-1"></div>
                    <span>본부평균</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* ② 관리 지점 실적 현황 */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-bold text-gray-900 flex items-center">
                <Activity className="w-5 h-5 text-blue-500 mr-2" />
                당월 실적 현황
              </h2>
              
              {/* 상품군 필터 - 토글 버튼 스타일 */}
              <div className="flex bg-gray-100 rounded-lg p-1">
                {['전체', '건강', '종신/정기'].map(product => (
                  <button
                    key={product}
                    onClick={() => setSelectedProduct(product)}
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
            
            {/* 월누적 APE - 단독 카드 */}
            <div className="space-y-4">
              <div className="bg-white rounded-lg shadow-sm border p-4">
                <h4 className="text-sm font-semibold text-gray-700 mb-3">APE</h4>
                <div className="text-center mb-3">
                  <div className="text-2xl font-bold text-blue-600">{formatCurrency(getFilteredData('ape') * 10000)} <span className="text-xs text-gray-400">(일평균 {formatCurrency(getFilteredData('dailyApe') * 10000)})</span></div>
                </div>
                <div className="text-center">
                  <span className="text-xs text-gray-600">전월 동기 대비 ▲ </span>
                  <span className="text-sm font-medium text-green-600">{formatCurrency(getFilteredData('apeGrowthAmount') * 10000)}</span>
                </div>
              </div>
              
              {/* 설계 건수 & 청약 건수 */}
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-white rounded-lg shadow-sm border p-4">
                  <h4 className="text-sm font-semibold text-gray-700 mb-3">설계</h4>
                  <div className="text-center mb-3">
                    <div className="text-2xl font-bold text-blue-600">{getFilteredData('design')}<span className="text-base text-gray-500">건</span> <span className="text-xs text-gray-400">(일평균 {getFilteredData('dailyDesign')}건)</span></div>
                  </div>
                  <div className="text-center">
                    <span className="text-xs text-gray-600">전월 동기 대비 ▼ </span>
                    <span className="text-sm font-medium text-red-600">{Math.abs(getFilteredData('designGrowth'))}건</span>
                  </div>
                </div>

                <div className="bg-white rounded-lg shadow-sm border p-4">
                  <h4 className="text-sm font-semibold text-gray-700 mb-3">청약</h4>
                  <div className="text-center mb-3">
                    <div className="text-2xl font-bold text-blue-600">{getFilteredData('contract')}<span className="text-base text-gray-500">건</span> <span className="text-xs text-gray-400">(일평균 {getFilteredData('dailyContract')}건)</span></div>
                  </div>
                  <div className="text-center">
                    <span className="text-xs text-gray-600">전월 동기 대비 ▲ </span>
                    <span className="text-sm font-medium text-green-600">{getFilteredData('contractGrowth')}건</span>
                  </div>
                </div>
              </div>
            </div>
            
            {/* 이번달 일별 실적 */}
            <div className="bg-white rounded-lg shadow-sm border p-4">
              <h3 className="text-sm font-semibold text-gray-700 mb-4">일별 실적 추이</h3>
              
              <div className="h-60 relative bg-gray-50 rounded-lg p-3" style={{overflow: 'visible'}} onMouseLeave={() => setHoveredDayData(null)}>
                {/* 차트 영역 */}
                <div className="flex items-end justify-between h-full relative">
                  {/* 청약건수 파란색 선 - 평일만 연결 */}
                  <svg className="absolute inset-0 w-full h-full" style={{zIndex: 2, pointerEvents: 'none'}} viewBox="0 0 100 100" preserveAspectRatio="none">
                    <polyline
                      points={getDailyData().filter(d => !d.isWeekend).map((data, weekdayIndex) => {
                        const maxCount = Math.max(...getDailyData().filter(d => !d.isWeekend).map(d => d.contractCount));
                        const originalIndex = getDailyData().findIndex(d => d.day === data.day);
                        const x = (originalIndex / (getDailyData().length - 1)) * 100;
                        const y = 100 - ((data.contractCount / maxCount) * 80);
                        return `${x},${y}`;
                      }).join(' ')}
                      fill="none"
                      stroke="#3b82f6"
                      strokeWidth="0.8"
                      vectorEffect="non-scaling-stroke"
                    />
                  </svg>
                  
                  {getDailyData().map((data, i) => {
                    const barHeight = data.apeAmount === 0 ? 2 : (data.apeAmount / 25) * 120;
                    
                    return (
                      <div key={data.day} className="flex flex-col items-center relative" style={{width: '16px'}}>
                        {/* APE 막대 - 연한 회색 */}
                        <div 
                          className={`w-3 rounded-t hover:opacity-80 transition-opacity cursor-pointer ${
                            data.isWeekend ? 'bg-gray-300' : 'bg-gray-400'
                          }`}
                          style={{height: `${barHeight}px`}}
                          onMouseEnter={() => setHoveredDayData({...data, idx: i})}
                        />
                        
                        {/* 일자 */}
                        <div className="text-xs text-gray-600 mt-1" style={{fontSize: '10px'}}>{data.day}</div>
                        
                        {/* 툴팁 */}
                        {hoveredDayData && hoveredDayData.idx === i && (
                          <div
                            className="absolute bg-gray-800 text-white text-xs rounded px-2 py-1 whitespace-nowrap z-50 shadow-lg"
                            style={{
                              bottom: i < 3 ? 'auto' : '100%',
                              top: i < 3 ? '100%' : 'auto',
                              left: i <= 2 ? '0' : i >= getDailyData().length - 3 ? 'auto' : '50%',
                              right: i >= getDailyData().length - 3 ? '0' : 'auto',
                              transform: i > 2 && i < getDailyData().length - 3 ? 'translateX(-50%)' : 'none',
                              marginBottom: i >= 3 ? '8px' : '0',
                              marginTop: i < 3 ? '8px' : '0'
                            }}
                          >
                            <div>9월 {data.day}일 ({data.isWeekend ? '비영업일' : `영업 ${businessDays.elapsed - (20 - data.day)}일차`}) - {selectedProduct}</div>
                            <div>일 APE: {formatCurrency(data.apeAmount * 1000000)}</div>
                            <div>청약: {data.contractCount}건</div>
                            {!data.isWeekend && <div className="text-yellow-300">잔여 영업일: {businessDays.total - (businessDays.elapsed - (20 - data.day))}일</div>}
                            {/* 화살표 */}
                            <div
                              className="absolute w-0 h-0"
                              style={{
                                borderLeft: '4px solid transparent',
                                borderRight: '4px solid transparent',
                                borderTop: i < 3 ? 'none' : '4px solid #1f2937',
                                borderBottom: i < 3 ? '4px solid #1f2937' : 'none',
                                left: i <= 2 ? '12px' : i >= getDailyData().length - 3 ? 'auto' : '50%',
                                right: i >= getDailyData().length - 3 ? '12px' : 'auto',
                                top: i < 3 ? '-4px' : 'auto',
                                bottom: i < 3 ? 'auto' : '-4px',
                                transform: i > 2 && i < getDailyData().length - 3 ? 'translateX(-50%)' : 'none'
                              }}
                            />
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
                  <div className="w-3 h-3 bg-gray-400 mr-1 rounded"></div>
                  <span>일 APE</span>
                </div>
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-blue-500 mr-1 rounded-full"></div>
                  <span>청약 건수</span>
                </div>
              </div>
            </div>


            {/* 상품 판매 현황 */}
            <div className="bg-white rounded-lg shadow-sm border p-4">
              <h3 className="text-sm font-semibold text-gray-700 mb-3">상품 판매 현황</h3>
              
              {/* 포트폴리오 분석 - 서브제목 제거 */}
              <div className="mb-4">
                <div className="space-y-2">
                  {getPortfolioData().map((item, idx) => {
                    const apeAmountRaw = getFilteredData('ape') * item.value / 100; // 만원 단위
                    
                    const formattedAmount = formatCurrency(apeAmountRaw * 10000);
                    
                    return (
                      <div 
                        key={idx} 
                        className="flex items-center gap-3 mb-1 group relative cursor-pointer"
                        title={`월 APE: ${formattedAmount}`}
                      >
                        <span className="text-xs text-gray-700 w-28 flex-shrink-0">{item.name}</span>
                        <div className="flex-1 bg-gray-200 rounded-full h-4">
                          <div
                            className="h-4 rounded-full transition-all hover:opacity-80"
                            style={{ width: `${item.value}%`, backgroundColor: item.color }}
                          />
                        </div>
                        <span className="text-xs font-medium text-gray-700 w-8 text-right flex-shrink-0">{item.value}%</span>
                        
                        {/* 툴팁 */}
                        <div className="absolute left-1/2 -top-8 transform -translate-x-1/2 bg-gray-800 text-white text-xs rounded px-2 py-1 whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity z-10 pointer-events-none">
                          월 APE: {formattedAmount}
                        </div>
                      </div>
                    );
                  })}
                </div>
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
                        className="grid gap-2 p-2 hover:bg-blue-50 rounded-lg cursor-pointer transition-all"
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

          {/* ③ 지점 활동 체크 */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-bold text-gray-900 flex items-center">
                <AlertTriangle className="w-5 h-5 text-orange-500 mr-2" />
                지점 활동 체크
              </h2>
            </div>
            
            {/* 나의 관리 지점 */}
            <div className="bg-white rounded-lg shadow-sm border p-4">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-sm font-semibold text-gray-800">나의 관리 지점</h3>
                <button
                  onClick={() => setBranchInfoModal(true)}
                  className="text-xs text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded transition-colors flex items-center gap-1 px-2 py-1"
                >
                  <span>전체 보기</span>
                  <ChevronRight className="w-3 h-3" />
                </button>
              </div>
              <div className="flex items-center justify-center gap-8">
                <div className="text-center">
                  <span className="text-sm text-gray-500 mr-2">전체</span>
                  <span className="text-xl font-bold text-gray-900">160개</span>
                </div>
                <div className="h-6 w-px bg-gray-200"></div>
                <div className="text-center">
                  <span className="text-sm text-gray-500 mr-2">실적 발생</span>
                  <span className="text-xl font-bold text-blue-600">95개</span>
                  <span className="text-sm font-normal text-gray-500 ml-1">(59.4%)</span>
                </div>
              </div>
            </div>

            {/* 지점별 상세 바로가기 버튼 */}
            <div className="mt-3">
              <button
                onClick={handleBranchDetailClick}
                className="w-full bg-gradient-to-r from-blue-500 to-blue-600 text-white px-4 py-3 rounded text-sm font-medium hover:shadow-lg transition-all flex items-center justify-center gap-2"
              >
                <Building className="w-4 h-4" />
                지점별 상세 바로가기
              </button>
            </div>
            

            {/* 방문 추천 지점 */}
            <div className="bg-white rounded-lg shadow-sm border p-4">
              <div className="flex items-center gap-2 mb-3 relative">
                <h3 className="text-sm font-semibold text-gray-700">방문 추천 지점</h3>
                <button
                  className="ml-auto p-1 text-gray-400 hover:text-gray-600 relative"
                  onClick={() => setShowCriteriaTooltip(!showCriteriaTooltip)}
                >
                  <HelpCircle className="w-4 h-4" />
                </button>

                {/* 산출 기준 툴팁 */}
                {showCriteriaTooltip && (
                  <div className="absolute top-8 right-0 w-80 bg-gray-800 text-white text-xs rounded-lg p-3 z-20 shadow-lg">
                    <div className="mb-2 font-semibold text-red-300">🚨 위험 신호</div>
                    <div className="space-y-1 mb-3 text-xs">
                      <div>• <strong>실적 급하락:</strong> 전월 동기 대비 APE -30% 이상</div>
                      <div>• <strong>목표달성 미달:</strong> 목표 페이스 대비 현재 실적 -30% 이상</div>
                      <div>• <strong>활동 중단:</strong> 지난달 실적이 있었지만, 이번 달 활동(APE)이 없는 지점</div>
                      <div>• <strong>핵심인력 해촉:</strong> 지난달에 실적이 있었던 '가동 설계사'가 이번 달에 퇴사(해촉)한 경우 (단 1명이라도 발생 시)</div>
                      <div>• <strong>계약 품질 이슈:</strong> 당월 인수거절/청약철회 3건 이상</div>
                    </div>
                    <div className="mb-2 font-semibold text-green-300">🚀 기회 신호</div>
                    <div className="space-y-1 text-xs">
                      <div>• <strong>실적 급상승:</strong> 전월 동기 대비 APE +30% 이상</div>
                      <div>• <strong>목표 초과 달성:</strong> 당월 목표 120% 이상 달성</div>
                      <div>• <strong>고액 계약 체결:</strong> 월 보험료 30만 원 이상 계약 체결</div>
                      <div>• <strong>신규 위촉:</strong> 이번 달에 신규 설계사가 위촉된 경우 (단 1명이라도 발생 시)</div>
                      <div>• <strong>신규 가동:</strong> 위촉된 설계사가 생애 첫 계약(가동)에 성공한 경우 (단 1명이라도 발생 시)</div>
                      <div>• <strong>체결률 저조:</strong> 설계 건수는 본부 평균 이상, 계약 전환율은 평균 이하</div>
                    </div>
                    <div className="absolute -top-2 right-4 w-0 h-0 border-l-4 border-r-4 border-b-4 border-l-transparent border-r-transparent border-b-gray-800"></div>
                  </div>
                )}
              </div>

              <div className="space-y-2">
                {/* 확장되지 않았을 때는 5개, 확장했을 때는 전체 표시 */}
                {[...managementFocus.critical, ...managementFocus.opportunities]
                  .slice(0, expandedRecommendations ? undefined : 5)
                  .map((item) => (
                    <div
                      key={item.id}
                      className={`flex items-center justify-between p-2 bg-gray-50 rounded-lg cursor-pointer border ${
                        item.type === 'risk' ? 'hover:bg-red-50' : 'hover:bg-green-50'
                      }`}
                      onClick={() => handleVisitBranchClick(item.agency, item.branch)}
                    >
                      <div className="flex items-center">
                        <div className={`w-2 h-2 rounded-full mr-2 ${
                          item.type === 'risk' ? 'bg-red-500' : 'bg-green-500'
                        }`}></div>
                        <div>
                          <div className="text-sm font-medium">{item.agency} &gt; {item.branch}</div>
                          <div className="text-xs text-gray-500">[{item.tag}] {item.reason}</div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className={`text-sm font-bold ${
                          item.type === 'risk' ? 'text-red-600' : 'text-green-600'
                        }`}>{item.metric}</div>
                        <ChevronRight className="w-4 h-4 text-gray-400" />
                      </div>
                    </div>
                  ))}

              </div>

              {/* 더보기 버튼 */}
              {[...managementFocus.critical, ...managementFocus.opportunities].length > 5 && (
                <div className="mt-3 text-center">
                  <button
                    onClick={() => setExpandedRecommendations(!expandedRecommendations)}
                    className="text-blue-600 hover:text-blue-700 text-sm font-medium flex items-center justify-center gap-1 mx-auto"
                  >
                    {expandedRecommendations ? '접기' : '더보기'}
                    <ChevronDown className={`w-4 h-4 transition-transform ${
                      expandedRecommendations ? 'rotate-180' : ''
                    }`} />
                  </button>
                </div>
              )}
            </div>


            {/* 지점 순위 현황 */}
            <div className="bg-white rounded-lg shadow-sm border p-4">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-semibold text-gray-700">지점 랭킹 TOP 5</h3>
                <div className="flex bg-gray-100 rounded-lg p-1">
                  <button
                    onClick={() => setBranchPeriod('current')}
                    className={`px-3 py-1 text-xs font-medium rounded transition-colors ${
                      branchPeriod === 'current'
                        ? 'bg-white text-gray-900 shadow-sm'
                        : 'text-gray-600 hover:text-gray-900'
                    }`}
                  >
                    당월
                  </button>
                  <button
                    onClick={() => setBranchPeriod('previous')}
                    className={`px-3 py-1 text-xs font-medium rounded transition-colors ${
                      branchPeriod === 'previous'
                        ? 'bg-white text-gray-900 shadow-sm'
                        : 'text-gray-600 hover:text-gray-900'
                    }`}
                  >
                    전월
                  </button>
                </div>
              </div>
              
              {/* 테이블 형태 */}
              <div className="overflow-hidden">
                {/* 헤더 */}
                <div className="grid gap-2 pb-2 border-b border-gray-200 mb-3" style={{gridTemplateColumns: '30px 1fr 80px 90px'}}>
                  <div className="text-xs font-medium text-gray-500">순위</div>
                  <div className="text-xs font-medium text-gray-500">지점명</div>
                  <button
                    onClick={() => {
                      if (branchSortBy === 'ape') {
                        setBranchSortOrder(branchSortOrder === 'desc' ? 'asc' : 'desc');
                      } else {
                        setBranchSortBy('ape');
                        setBranchSortOrder('desc');
                      }
                    }}
                    className={`text-xs font-medium hover:text-blue-600 transition-colors text-left flex items-center gap-1 ${
                      branchSortBy === 'ape' ? 'text-blue-600 font-bold' : 'text-gray-900'
                    }`}
                  >
                    APE
                    {branchSortBy === 'ape' && (
                      branchSortOrder === 'desc' ? <ArrowDown className="w-3 h-3" /> : <ArrowUp className="w-3 h-3" />
                    )}
                  </button>
                  <button
                    onClick={() => {
                      if (branchSortBy === 'achievement') {
                        setBranchSortOrder(branchSortOrder === 'desc' ? 'asc' : 'desc');
                      } else {
                        setBranchSortBy('achievement');
                        setBranchSortOrder('desc');
                      }
                    }}
                    className={`text-xs font-medium hover:text-blue-600 transition-colors text-left flex items-center gap-1 ${
                      branchSortBy === 'achievement' ? 'text-blue-600 font-bold' : 'text-gray-900'
                    }`}
                  >
                    달성률
                    {branchSortBy === 'achievement' && (
                      branchSortOrder === 'desc' ? <ArrowDown className="w-3 h-3" /> : <ArrowUp className="w-3 h-3" />
                    )}
                  </button>
                </div>
                
                {/* 데이터 행 */}
                <div className="space-y-1">
                  {getBranchRankings().data.map((branch, idx) => (
                    <div
                      key={idx}
                      className="grid gap-2 p-2 hover:bg-blue-50 rounded-lg cursor-pointer transition-all"
                      style={{gridTemplateColumns: '30px 1fr 80px 90px'}}
                      onClick={() => handleBranchClick(branch.agency, branch.branch)}
                    >
                      <div className="flex items-center">
                        <div className="w-4 h-4 rounded-full flex items-center justify-center text-xs font-bold bg-yellow-400 text-yellow-900">
                          {idx + 1}
                        </div>
                      </div>
                      <div className="flex items-center min-w-0">
                        <div className="text-xs font-medium text-gray-900 break-words">
                          <div>{branch.agency}</div>
                          <div className="text-xs text-gray-600">{branch.branch}</div>
                        </div>
                      </div>
                      <div className="flex items-center">
                        <div className={`text-xs ${
                          branchSortBy === 'ape' ? 'text-blue-600 font-bold' : 'text-gray-900'
                        }`}>{branch.ape.toFixed(1)}만원</div>
                      </div>
                      <div className="flex items-center">
                        <div className={`text-xs ${
                          branchSortBy === 'achievement' ? 'text-blue-600 font-bold' : 'text-gray-900'
                        }`}>
                          {branch.target ? Math.round((branch.ape / (branch.target || 120)) * 100 * 10) / 10 : branch.achievement}%
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* 더보기 버튼 */}
              <div className="mt-3 pt-3 border-t border-gray-200">
                <button
                  onClick={() => setShowAllBranchesModal(true)}
                  className="w-full text-center text-xs text-blue-600 hover:text-blue-800 font-medium transition-colors"
                >
                  더보기 (전체 랭킹 보기)
                </button>
              </div>

            </div>

            <div className="text-xs text-gray-500 text-center p-2 bg-gray-50 rounded">
              지점 클릭 시 해당 지점의 상세 분석 화면으로 이동합니다
            </div>

          </div>
        </div>

      </div>

      {/* 전체 지점 목록 모달 */}
      {showAllBranchesModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50" onClick={() => setShowAllBranchesModal(false)}>
          <div className="bg-white rounded-lg p-6 max-w-6xl w-full mx-4 max-h-[80vh] flex flex-col" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">
                전체 지점 랭킹 (160개)
              </h3>
              <button
                onClick={() => setShowAllBranchesModal(false)}
                className="text-gray-500 hover:text-gray-700 text-xl"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto">
              {/* 단위 표시 */}
              <div className="px-3 py-2 text-xs text-gray-500 border-b border-gray-200 text-right">
                <span>[단위: 만원, %]</span>
              </div>
              {/* 테이블 헤더 */}
              <div className="bg-gray-100 border-b sticky top-0">
                {/* 메인 헤더 */}
                <div className="grid gap-2 p-3 pb-1 text-xs font-semibold text-gray-700 border-b border-gray-200" style={{gridTemplateColumns: '40px 140px 1fr 240px 140px'}}>
                  <div className="row-span-2 flex items-center">순위</div>
                  <div className="row-span-2 flex items-center">대리점명</div>
                  <div className="row-span-2 flex items-center">지점명</div>
                  <div className="text-center">APE</div>
                  <div className="text-center">당월 Plan</div>
                </div>
                {/* 서브 헤더 */}
                <div className="grid gap-2 px-3 pb-2 pt-1 text-xs font-semibold text-gray-600" style={{gridTemplateColumns: '40px 140px 1fr 80px 80px 80px 70px 70px'}}>
                  <div></div>
                  <div></div>
                  <div></div>
                  <button
                    onClick={() => {
                      if (modalSortBy === 'ape') {
                        setModalSortOrder(modalSortOrder === 'desc' ? 'asc' : 'desc');
                      } else {
                        setModalSortBy('ape');
                        setModalSortOrder('desc');
                      }
                    }}
                    className={`text-center hover:text-blue-600 transition-colors ${
                      modalSortBy === 'ape' ? 'text-black font-bold' : 'text-black font-normal'
                    }`}
                  >
                    당월
                    {modalSortBy === 'ape' && (
                      modalSortOrder === 'desc' ? ' ↓' : ' ↑'
                    )}
                  </button>
                  <button
                    onClick={() => {
                      if (modalSortBy === 'previousApe') {
                        setModalSortOrder(modalSortOrder === 'desc' ? 'asc' : 'desc');
                      } else {
                        setModalSortBy('previousApe');
                        setModalSortOrder('desc');
                      }
                    }}
                    className={`text-center hover:text-blue-600 transition-colors ${
                      modalSortBy === 'previousApe' ? 'text-black font-bold' : 'text-black font-normal'
                    }`}
                  >
                    전월
                    {modalSortBy === 'previousApe' && (
                      modalSortOrder === 'desc' ? ' ↓' : ' ↑'
                    )}
                  </button>
                  <button
                    onClick={() => {
                      if (modalSortBy === 'threeMonthAvg') {
                        setModalSortOrder(modalSortOrder === 'desc' ? 'asc' : 'desc');
                      } else {
                        setModalSortBy('threeMonthAvg');
                        setModalSortOrder('desc');
                      }
                    }}
                    className={`text-center hover:text-blue-600 transition-colors ${
                      modalSortBy === 'threeMonthAvg' ? 'text-black font-bold' : 'text-black font-normal'
                    }`}
                  >
                    3개월평균
                    {modalSortBy === 'threeMonthAvg' && (
                      modalSortOrder === 'desc' ? ' ↓' : ' ↑'
                    )}
                  </button>
                  <button
                    onClick={() => {
                      if (modalSortBy === 'target') {
                        setModalSortOrder(modalSortOrder === 'desc' ? 'asc' : 'desc');
                      } else {
                        setModalSortBy('target');
                        setModalSortOrder('desc');
                      }
                    }}
                    className={`text-center hover:text-blue-600 transition-colors ${
                      modalSortBy === 'target' ? 'text-black font-bold' : 'text-black font-normal'
                    }`}
                  >
                    목표
                    {modalSortBy === 'target' && (
                      modalSortOrder === 'desc' ? ' ↓' : ' ↑'
                    )}
                  </button>
                  <button
                    onClick={() => {
                      if (modalSortBy === 'achievement') {
                        setModalSortOrder(modalSortOrder === 'desc' ? 'asc' : 'desc');
                      } else {
                        setModalSortBy('achievement');
                        setModalSortOrder('desc');
                      }
                    }}
                    className={`text-center hover:text-blue-600 transition-colors ${
                      modalSortBy === 'achievement' ? 'text-black font-bold' : 'text-black font-normal'
                    }`}
                  >
                    달성률
                    {modalSortBy === 'achievement' && (
                      modalSortOrder === 'desc' ? ' ↓' : ' ↑'
                    )}
                  </button>
                </div>
              </div>

              {/* 테이블 내용 */}
              <div className="space-y-0">
                {(() => {
                  const sortedData = getBranchRankings(true).data.slice(0, 160).map(branch => ({
                    ...branch,
                    threeMonthAvg: branch.ape === 0 ? 0 : Math.round((branch.ape + (branch.previousApe || Math.round(branch.ape * 0.75)) + Math.round(branch.ape * 0.65)) / 3),
                    calculatedAchievement: branch.ape === 0 ? 0 : (branch.target ? Math.round((branch.ape / (branch.target || 120)) * 100 * 10) / 10 : branch.achievement)
                  })).sort((a, b) => {
                    let aValue, bValue;
                    switch(modalSortBy) {
                      case 'ape':
                        aValue = a.ape;
                        bValue = b.ape;
                        break;
                      case 'previousApe':
                        aValue = a.previousApe || (a.ape * 0.85);
                        bValue = b.previousApe || (b.ape * 0.85);
                        break;
                      case 'threeMonthAvg':
                        aValue = a.threeMonthAvg;
                        bValue = b.threeMonthAvg;
                        break;
                      case 'target':
                        aValue = a.target || 120;
                        bValue = b.target || 120;
                        break;
                      case 'achievement':
                      default:
                        aValue = a.calculatedAchievement;
                        bValue = b.calculatedAchievement;
                        break;
                    }
                    return modalSortOrder === 'desc' ? bValue - aValue : aValue - bValue;
                  });

                  return sortedData.map((branch, idx) => {
                  return (
                    <div
                      key={idx}
                      className="grid gap-2 p-3 border-b border-gray-100 hover:bg-gray-50 cursor-pointer transition-colors"
                      style={{gridTemplateColumns: '40px 140px 1fr 80px 80px 80px 70px 70px'}}
                      onClick={() => handleBranchClick(branch.agency, branch.branch)}
                    >
                      <div className="flex items-center">
                        <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                          idx < 5 ? 'bg-yellow-400 text-yellow-900' : 'bg-gray-200 text-gray-600'
                        }`}>
                          {idx + 1}
                        </div>
                      </div>
                      <div className="flex items-center">
                        <div className="text-sm text-gray-600 truncate">{branch.agency}</div>
                      </div>
                      <div className="flex items-center">
                        <div className="text-sm font-medium text-gray-900 truncate">{branch.branch}</div>
                      </div>
                      {/* APE 섹션 */}
                      <div className="flex items-center justify-center">
                        <div className={`text-xs ${
                          modalSortBy === 'ape' ? 'font-bold text-gray-900' : 'font-normal text-gray-900'
                        }`}>{branch.ape === 0 ? '-' : branch.ape.toFixed(1)}</div>
                      </div>
                      <div className="flex items-center justify-center">
                        <div className={`text-xs ${
                          modalSortBy === 'previousApe' ? 'font-bold text-gray-600' : 'font-normal text-gray-600'
                        }`}>{branch.ape === 0 ? '-' : (branch.previousApe || Math.round(branch.ape * 0.85)).toFixed(1)}</div>
                      </div>
                      <div className="flex items-center justify-center">
                        <div className={`text-xs ${
                          modalSortBy === 'threeMonthAvg' ? 'font-bold text-gray-600' : 'font-normal text-gray-600'
                        }`}>{branch.ape === 0 ? '-' : branch.threeMonthAvg.toFixed(1)}</div>
                      </div>
                      {/* 목표 섹션 */}
                      <div className="flex items-center justify-center">
                        <div className={`text-xs ${
                          modalSortBy === 'target' ? 'font-bold text-gray-900' : 'font-normal text-gray-900'
                        }`}>{(branch.target || 120).toFixed(1)}</div>
                      </div>
                      <div className="flex items-center justify-center">
                        <div className={`text-xs ${
                          modalSortBy === 'achievement'
                            ? `font-bold ${branch.ape === 0 ? 'text-gray-500' : 'text-black'}`
                            : `font-normal ${branch.ape === 0 ? 'text-gray-500' : 'text-black'}`
                        }`}>
                          {branch.ape === 0 ? '-' : branch.calculatedAchievement.toFixed(1)}
                        </div>
                      </div>
                    </div>
                  );
                });
                })()}
              </div>
            </div>

          </div>
        </div>
      )}

      {/* 지점 기본정보 모달 */}
      {showBranchInfoModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50" onClick={() => setBranchInfoModal(false)}>
          <div className="bg-white rounded-lg p-6 max-w-7xl w-full mx-4 max-h-[90vh] flex flex-col" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">전체 관리 지점 목록 (160개)</h3>
              <button
                onClick={() => setBranchInfoModal(false)}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="flex-1 overflow-auto">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-200">
                      {/* 번호 */}
                      <th className="text-center py-3 px-2 bg-gray-50 text-xs font-semibold text-gray-800 border-r border-gray-200">
                        번호
                      </th>
                      <th className="text-left py-3 px-3 bg-gray-50 text-xs font-semibold text-gray-800 border-r border-gray-200">
                        대리점명
                      </th>
                      <th className="text-left py-3 px-3 bg-gray-50 text-xs font-semibold text-gray-800 border-r border-gray-200">
                        지점명
                      </th>

                      {/* 기본 정보 */}
                      <th className="text-left py-3 px-3 bg-blue-50 text-xs font-semibold text-blue-800 border-r border-blue-200">
                        주소
                      </th>
                      <th className="text-left py-3 px-3 bg-blue-50 text-xs font-semibold text-blue-800 border-r border-blue-200">
                        연락처
                      </th>
                      <th className="text-left py-3 px-3 bg-blue-50 text-xs font-semibold text-blue-800 border-r border-blue-200">
                        제휴일자
                      </th>

                      {/* 지점 실적 */}
                      <th className="text-center py-3 px-2 bg-orange-50 text-xs font-semibold text-orange-800 border-r border-orange-200">
                        당월 실적
                      </th>

                      {/* 설계사 위촉 */}
                      <th className="text-center py-3 px-2 bg-green-50 text-xs font-semibold text-green-800 border-r border-green-200">
                        위촉설계사
                      </th>
                      <th className="text-center py-3 px-2 bg-green-50 text-xs font-semibold text-green-800">
                        가동설계사
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {getBranchInfoData().map((branch, idx) => (
                      <tr key={idx} className="border-b border-gray-100 hover:bg-gray-50">
                        {/* 번호 */}
                        <td className="py-3 px-2 text-center border-r border-gray-200 text-xs font-medium text-gray-900">
                          {branch.no}
                        </td>
                        <td className="py-3 px-3 border-r border-gray-200 text-xs text-gray-900 font-medium">
                          {branch.agency}
                        </td>
                        <td className="py-3 px-3 border-r border-gray-200 text-xs text-gray-900 font-medium">
                          {branch.branch}
                        </td>

                        {/* 기본 정보 */}
                        <td className="py-3 px-3 border-r border-gray-200 text-xs text-gray-600">
                          {branch.address}
                        </td>
                        <td className="py-3 px-3 border-r border-gray-200 text-xs text-gray-700">
                          {branch.phone}
                        </td>
                        <td className="py-3 px-3 border-r border-gray-200 text-xs text-gray-700">
                          {branch.partnershipDate}
                        </td>

                        {/* 지점 실적 */}
                        <td className="py-3 px-2 text-center border-r border-gray-200">
                          <span className={`text-xs font-bold ${
                            branch.currentMonthAPE > 0 ? 'text-green-600' : 'text-red-600'
                          }`}>
                            {branch.currentMonthAPE > 0 ? 'Y' : 'N'}
                          </span>
                        </td>

                        {/* 설계사 위촉 */}
                        <td className="py-3 px-2 text-center border-r border-gray-200 text-xs font-medium text-gray-900">
                          {branch.totalAgents === '-' ? '-' : `${branch.totalAgents}명`}
                        </td>
                        <td className="py-3 px-2 text-center text-xs font-medium text-green-600">
                          {branch.activeAgents === '-' ? '-' : `${branch.activeAgents}명`}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="mt-4 pt-4 border-t border-gray-200 text-center">
              <p className="text-xs text-gray-500">지점명 클릭 시 해당 지점의 상세 분석 화면으로 이동합니다</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Agent360Dashboard;