import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Trophy, Download, Building, ChevronRight, ChevronDown, ChevronUp, ArrowUp, ArrowDown, Activity, AlertTriangle, HelpCircle, X, Search, Users } from 'lucide-react';

const Agent360Dashboard = () => {
  const navigate = useNavigate();
  const [selectedKPI, setSelectedKPI] = useState('nb_plan');
  const [yearlyKPI, setYearlyKPI] = useState('nb_plan'); // 연간 차트용 KPI
  const [selectedYear] = useState('2025'); // eslint-disable-line @typescript-eslint/no-unused-vars
  const [selectedProduct, setSelectedProduct] = useState('전체');
  const [productSortBy, setProductSortBy] = useState('amount');
  const [hoveredProduct, setHoveredProduct] = useState<any>(null);
  const [performanceType, setPerformanceType] = useState<'APE' | 'MMP'>('APE');

  // 지능형 단위 포매팅 함수
  const formatCurrency = (amount: number, kpi: 'APE' | 'MMP' = 'APE') => {
    // 지점장 지표는 모두 백만원 단위
    const millions = amount / 1000000;
    if (kpi === 'MMP') {
      // MMP는 소수점 1자리
      return `${millions.toFixed(1)}백만원`;
    } else {
      // APE는 정수
      return `${Math.round(millions)}백만원`;
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
    // 목표달성률 (APE/MMP 기준)
    goalAchievement: {
      current: 70.0, // 현재 달성률 (%)
      target: 500000000, // 목표 (원) - APE 기준 500백만원
      actual: 350000000, // 실제 (원) - APE 기준 350백만원
      hqAvg: 65.2, // 영업본부 평균 (%)
      nationalAvg: 62.8, // 전국 평균 (%)
      vsLastMonth: 8.5, // 전월 동기 대비 증감 (%p)
      gap: 150000000, // 남은 금액 (원) - 500백만 - 350백만
      dailyRequired: 21400000, // 일평균 필요 (원) - 약 21백만원/일
      hqRankTotal: { rank: 12, total: 50 }, // 전체 지점장 순위
      hqRankRegion: { rank: 5, total: 10 } // 영업본부 순위
    },
    // 설계사 가동률
    designerActivity: {
      current: 67.8, // 현재 가동률 (%) - 251/370
      active: 251, // 실제 가동 설계사 수
      total: 3787, // 전체 담당 설계사 수
      hqAvg: 7.2, // 영업본부 평균 (%)
      nationalAvg: 8.1, // 전국 평균 (%)
      vsLastMonth: -15, // 전월 동기 대비 증감 (명) - 가동 설계사 감소
      vsLastMonthPercent: -0.4, // 전월 동기 대비 증감 (%p) - 가동률 감소
      plan: 370, // 가동 계획
      planAchievement: 67.8 // 가동 계획 대비 달성률 (%) - 251/370
    },
    // 모바일 청약률
    mobileContract: {
      current: 76.5, // 현재 모바일 청약률 (%) - 251/328
      count: 251, // 모바일 청약 건수
      total: 328, // 전체 청약 건수
      hqAvg: 42.6, // 영업본부 평균 (%)
      nationalAvg: 38.9, // 전국 평균 (%)
      vsLastMonth: -12, // 전월 동기 대비 증감 (건) - 모바일 건수 감소
      vsLastMonthPercent: 3.2 // 전월 동기 대비 증감 (%p) - 비율은 상승
    }
  };

  // MMP일 때는 APE를 12로 나누어 표시
  let myKPI = {
    ...myKPIDefault,
    goalAchievement: {
      ...myKPIDefault.goalAchievement,
      target: performanceType === 'MMP' ? myKPIDefault.goalAchievement.target / 12 : myKPIDefault.goalAchievement.target,
      actual: performanceType === 'MMP' ? myKPIDefault.goalAchievement.actual / 12 : myKPIDefault.goalAchievement.actual,
      gap: performanceType === 'MMP' ? myKPIDefault.goalAchievement.gap / 12 : myKPIDefault.goalAchievement.gap,
      dailyRequired: performanceType === 'MMP' ? myKPIDefault.goalAchievement.dailyRequired / 12 : myKPIDefault.goalAchievement.dailyRequired
    }
  };

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
        { month: '5월', value: 103.8, hqAvg: 59.4, actual: 415, target: 400 },
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
        { month: '5월', value: 103.8, hqAvg: 59.4, actual: 415, target: 400 },
        { month: '6월', value: 99.6, hqAvg: 102.2, actual: 498, target: 500 },
        { month: '7월', value: 106.3, hqAvg: 101.1, actual: 425, target: 400 },
        { month: '8월', value: 101.2, hqAvg: 103.5, actual: 506, target: 500 },
        { month: '9월', value: 62.0, hqAvg: 59.4, actual: 310, target: 500 }
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


  // 월별 데이터만 사용 (헤더와 연동 가능하도록)
  const kpiData = monthlyTrend[2025][selectedKPI as keyof typeof monthlyTrend[2025]] || [];

  // 지점 기본정보 데이터 함수
  const getBranchInfoData = (kpi = 'APE') => {
    // 기존 지점 순위 데이터에서 전체 160개 지점 가져오기 (가동 + 비가동)
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

      // 설계사 수 고정 생성 (기준별 재계산 방지)
      let totalAgents, activeAgents;
      const branchHash = (branchKey || '').split('').reduce((acc, char) => acc + char.charCodeAt(0), index);

      // 위촉설계사는 브랜치별로 고정된 값 (20~200 사이)
      totalAgents = 20 + (branchHash % 181);

      // 가동설계사 계산 (0이 될 수 있음)
      const hasPerformance = (branch.ape || 0) > 0.5; // 0.5 이상일 때만 실적 있음
      if (hasPerformance) {
        activeAgents = Math.floor(totalAgents * 0.2) + ((branchHash + index) % 12); // 위촉설계사의 20~40% 정도가 가동
        activeAgents = Math.min(activeAgents, totalAgents);
        // 일부는 가동설계사가 0인 경우도 있음
        if ((branchHash + index) % 15 === 0) activeAgents = 0;
      } else {
        activeAgents = 0;
      }

      // 실적값 계산 (가동설계사가 0이면 실적도 0)
      let performanceValue = 0;
      if (activeAgents > 0 && hasPerformance) {
        const randomFactor1 = (branchHash % 100) / 100; // 0~1
        const randomFactor2 = ((branchHash + index) % 100) / 100; // 0~1
        const randomFactor3 = ((branchHash * 2 + index) % 100) / 100; // 0~1

        // 목표에 비례한 실적 분포 (목표의 60~120% 사이)
        let baseValue;

        // 상위 10개: 큰 실적 (800만~2500만)
        if (index < 10) {
          baseValue = 8000000 + Math.floor(17000000 * randomFactor1);
        }
        // 다음 20개: 중상위 실적 (400만~800만)
        else if (index < 30) {
          baseValue = 4000000 + Math.floor(4000000 * randomFactor1);
        }
        // 다음 30개: 중간 실적 (150만~400만)
        else if (index < 60) {
          baseValue = 1500000 + Math.floor(2500000 * randomFactor1);
        }
        // 다음 70개: 작은 실적 (30만~150만)
        else if (index < 130) {
          baseValue = 300000 + Math.floor(1200000 * randomFactor1);
        }
        // 나머지 30개: 매우 작거나 0인 실적
        else {
          if (randomFactor1 < 0.5) {
            baseValue = 0; // 50%는 실적 0
          } else {
            baseValue = 50000 + Math.floor(250000 * randomFactor2);
          }
        }

        // 10만원 단위로 반올림
        baseValue = Math.round(baseValue / 100000) * 100000;

        performanceValue = kpi === 'MMP' ? Math.round(baseValue / 12) : baseValue;
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
        currentMonthAPE: performanceValue
      };
    });

    return branches;
  };

  // 방문 추천 지점 (간단하고 직관적)
  // 메인 대시보드용 알림 시스템 (Branch360Dashboard와 동일한 로직)
  const getMainDashboardBranchAlerts = (agency: string, branch: string) => {
    const alerts = [];

    // 복수 알림이 있는 지점들
    if (agency === '메타리치' && branch === '보험스토어') {
      alerts.push(
        { type: '위험', title: '3개월 연속 실적 하락', priority: 1 },
        { type: '위험', title: '목표달성 미달', priority: 1 },
        { type: '기회', title: '신규 위촉 발생', priority: 2 }
      );
    } else if (agency === '삼성화재' && branch === '역삼지점') {
      alerts.push(
        { type: '위험', title: '3개월 연속 실적 하락', priority: 1 },
        { type: '위험', title: '목표달성 미달', priority: 1 }
      );
    } else if (agency === '삼성화재' && branch === '강남지점') {
      alerts.push(
        { type: '기회', title: '실적 급상승', priority: 2 },
        { type: '기회', title: '고액 계약 체결', priority: 2 }
      );
    } else if (agency === '삼성화재' && branch === '서초지점') {
      alerts.push(
        { type: '변화', title: '신규 위촉 발생', priority: 3 }
      );
    } else if (agency === '글로벌금융판매' && branch === '케이에스에프에스동대문') {
      alerts.push(
        { type: '위험', title: '목표달성 미달', priority: 1 },
        { type: '위험', title: '계약 품질 이슈', priority: 1 }
      );
    } else if (agency === '글로벌금융판매' && branch === '리더스일산') {
      alerts.push(
        { type: '기회', title: '실적 급상승', priority: 2 },
        { type: '변화', title: '신규 위촉 발생', priority: 3 },
        { type: '기회', title: '고액 계약 체결', priority: 2 }
      );
    }

    return alerts.sort((a, b) => a.priority - b.priority);
  };


  const managementFocus = [
    {
      id: 1,
      agency: '메타리치',
      branch: '보험스토어',
      issue: '3개월 연속 실적 하락 (외 2건)',
      detail: '',
      type: 'risk',
      alerts: getMainDashboardBranchAlerts('메타리치', '보험스토어')
    },
    {
      id: 2,
      agency: '글로벌금융판매',
      branch: '케이에스에프에스동대문',
      issue: '목표달성 미달 (외 1건)',
      detail: '',
      type: 'risk',
      alerts: getMainDashboardBranchAlerts('글로벌금융판매', '케이에스에프에스동대문')
    },
    {
      id: 3,
      agency: '지금용코리아',
      branch: '대원',
      issue: '핵심인력 해촉',
      detail: '',
      type: 'risk'
    },
    {
      id: 4,
      agency: '더블유에셋',
      branch: '일산센터',
      issue: '계약 품질 이슈',
      detail: '',
      type: 'risk'
    },
    {
      id: 5,
      agency: '글로벌금융판매',
      branch: '리더스일산',
      issue: '실적 급상승 (외 2건)',
      detail: '',
      type: 'opportunity',
      alerts: getMainDashboardBranchAlerts('글로벌금융판매', '리더스일산')
    },
    {
      id: 6,
      agency: '어센틱금융그룹',
      branch: '구미 스튜디오',
      issue: '고액 계약 체결',
      detail: '',
      type: 'opportunity'
    },
    {
      id: 7,
      agency: '라이프파트너스',
      branch: '부산센터',
      issue: '신규 가동',
      detail: '',
      type: 'opportunity'
    },
    {
      id: 8,
      agency: '한국지에이금융서비스',
      branch: '일산지사',
      issue: '연속 가동자 이탈',
      detail: '',
      type: 'change'
    },
    {
      id: 9,
      agency: '지에이스타금융서비스',
      branch: '부천코어',
      issue: '신규 위촉 발생',
      detail: '',
      type: 'change'
    },
    {
      id: 10,
      agency: '메가',
      branch: '인슈에셋고양',
      issue: '가동률 급하락',
      detail: '',
      type: 'risk'
    },
    {
      id: 11,
      agency: '글로벌금융판매',
      branch: '브릿지재무설계',
      issue: '고객 만족도 상승',
      detail: '',
      type: 'opportunity'
    },
    {
      id: 12,
      agency: '한국지에이금융서비스',
      branch: '김포지사',
      issue: '계약 품질 개선',
      detail: '',
      type: 'opportunity'
    },
    {
      id: 13,
      agency: '메타리치',
      branch: '리치골드',
      issue: '장기 미관리 상태',
      detail: '',
      type: 'risk'
    },
    {
      id: 14,
      agency: '어센틱금융그룹',
      branch: '대구센터',
      issue: '신입 설계사 급증',
      detail: '',
      type: 'change'
    },
    {
      id: 15,
      agency: '라이프파트너스',
      branch: '대전센터',
      issue: '실적 부진 지속',
      detail: '',
      type: 'risk'
    }
  ];

  const getKPIData = () => {
    // 월별 데이터는 선택된 월까지만 표시 (헤더와 연동)
    const selectedMonthNumber = parseInt(appliedMonth.split('-')[1]);
    return kpiData.slice(0, selectedMonthNumber);
  };
  
  const getMaxValue = (data: any[], kpi: string) => {
    // 동적 스케일링: 데이터의 최대값에 여백 추가
    const values = data.map((d: any) => Math.max(d.value, d.hqAvg));
    const maxValue = Math.max(...values);
    return Math.ceil(maxValue * 1.1); // 최대값의 110%로 스케일링
  };
  
  const [hoveredData, setHoveredData] = useState<any>(null);
  const [hoveredYearlyData, setHoveredYearlyData] = useState<any>(null);
  const [showExpectedProgressTooltip, setShowExpectedProgressTooltip] = useState(false);
  const [showProgressTooltip, setShowProgressTooltip] = useState(false);
  const [hoveredDayData, setHoveredDayData] = useState<any>(null);
  const [branchSortBy, setBranchSortBy] = useState('achievement');
  const [branchSortOrder, setBranchSortOrder] = useState<'desc' | 'asc'>('desc');
  const [showCriteriaTooltip, setShowCriteriaTooltip] = useState(false);
  const [modalSize, setModalSize] = useState({ width: 700, height: 500 });
  const [isResizing, setIsResizing] = useState(false);
  const [resizeStart, setResizeStart] = useState({ x: 0, y: 0, width: 0, height: 0 });
  const [branchPeriod, setBranchPeriod] = useState<'current' | 'previous'>('current');
  const [showConversionTooltip, setShowConversionTooltip] = useState(false);

  // 잔여 영업일 계산 (9월 25일 기준 7일 남은 것으로 가정)
  const getRemainingBusinessDays = () => {
    // 실제로는 달력 API를 사용해야 하지만, 여기서는 가정
    return 7; // 9월 25일 기준 7일 남음
  };

  const remainingDays = getRemainingBusinessDays();
  const shouldShowLastMonthComparison = remainingDays <= 10;
  const [dailyChartMetric, setDailyChartMetric] = useState<'APE' | 'MMP' | '청약' | '설계'>(performanceType);
  const [visitEducationType, setVisitEducationType] = useState<'방문' | '교육'>('방문');
  const [showVisitEducationList, setShowVisitEducationList] = useState(false);

  // 방문/교육 데이터 생성
  const visitEducationData = {
    방문: {
      count: 23,
      data: [
        { date: '9/25', agency: '글로벌금융판매', branch: '하나돔', detail: '주력상품 홍보 및 업무 지원' },
        { date: '9/24', agency: '메타리치', branch: '골드자산관리센터', detail: '신상품 설명 및 판매 도구 전달' },
        { date: '9/24', agency: '지금용코리아', branch: '그레이트탑', detail: '분기별 실적 점검 및 개선방안 논의' },
        { date: '9/23', agency: '더블유에셋', branch: '서울지사', detail: '고객관리 방법 지도 및 상품자료 전달' },
        { date: '9/23', agency: '글로벌금융판매', branch: '리더스에이치비', detail: '설계사 교육프로그램 안내' },
        { date: '9/22', agency: '지에이스타금융서비스', branch: '부천코어', detail: '마케팅 지원 및 홍보물 제공' },
        { date: '9/22', agency: '한국지에이금융서비스', branch: '일산지사', detail: '신규 위촉 설계사 면담' },
        { date: '9/21', agency: '메가', branch: '인슈에셋고양', detail: '월별 목표 설정 및 달성 전략 수립' },
        { date: '9/20', agency: '글로벌금융판매', branch: '브릿지재무설계', detail: '고객 서비스 품질 개선 방안 논의' },
        { date: '9/20', agency: '메타리치', branch: '리치골드', detail: '상품 포트폴리오 다양화 컨설팅' }
      ]
    },
    교육: {
      count: 15,
      data: [
        { date: '9/25', agency: '글로벌금융판매', branch: '하나돔강북', detail: '신상품 교육: 건강보험 2.0 출시 설명' },
        { date: '9/24', agency: '메타리치', branch: '보험스토어', detail: '디지털 영업도구 활용법 교육' },
        { date: '9/23', agency: '지금용코리아', branch: '서울A', detail: '고객 상담 스킬 향상 교육' },
        { date: '9/23', agency: '더블유에셋', branch: '기업금융본부', detail: '법인 영업 전략 교육' },
        { date: '9/22', agency: '글로벌금융판매', branch: '케이엘아이케이베스트', detail: '종신보험 상품 설명 및 판매 기법' },
        { date: '9/21', agency: '지에이스타금융서비스', branch: '부천코어', detail: '고객 니즈 분석 및 맞춤 제안 교육' },
        { date: '9/20', agency: '한국지에이금융서비스', branch: '일산지사', detail: '신입 설계사 기초 교육' },
        { date: '9/20', agency: '메가', branch: '인슈에셋고양', detail: '정기보험 상품 교육' },
        { date: '9/19', agency: '메타리치', branch: '골드자산관리센터', detail: '고객 관리 시스템 사용법 교육' },
        { date: '9/18', agency: '글로벌금융판매', branch: '굿브즈스카이', detail: '영업 프로세스 개선 교육' }
      ]
    }
  };

  // performanceType 변경시 dailyChartMetric도 업데이트
  useEffect(() => {
    if (dailyChartMetric === 'APE' || dailyChartMetric === 'MMP') {
      setDailyChartMetric(performanceType);
    }
  }, [performanceType, dailyChartMetric]);
  const [showAllBranchesModal, setShowAllBranchesModal] = useState(false);
  const [showBranchInfoModal, setBranchInfoModal] = useState(false);
  const [branchInfoSortBy, setBranchInfoSortBy] = useState<'no' | 'agency' | 'branch' | 'address' | 'phone' | 'partnershipDate' | 'currentMonthAPE' | 'totalAgents' | 'activeAgents' | 'agencyBranch'>('currentMonthAPE');
  const [branchInfoSortOrder, setBranchInfoSortOrder] = useState<'asc' | 'desc'>('desc');
  const [modalKPI, setModalKPI] = useState<'APE' | 'MMP'>('APE'); // 모달용 KPI 상태
  const [branchRankingKPI, setBranchRankingKPI] = useState<'APE' | 'MMP'>('APE'); // 지점 순위 모달용 KPI 상태
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

    // 선택된 월의 년도와 월 파싱
    const [year, monthNum] = month.split('-').map(Number);

    // 기본값 대비 변동을 위한 시드값 생성 (년도와 월 기반)
    const seed = year * 12 + monthNum;
    const variation1 = ((seed % 23) - 11) * 0.02; // -0.22 ~ +0.24 범위의 변동
    const variation2 = ((seed % 17) - 8) * 0.03; // -0.24 ~ +0.27 범위의 변동
    const variation3 = ((seed % 13) - 6) * 0.04; // -0.24 ~ +0.28 범위의 변동

    // 과거 월이므로 dailyRequired는 항상 0 (완료된 월)
    return {
      goalAchievement: {
        current: Math.round((myKPIDefault.goalAchievement.current + variation1 * 30) * 10) / 10,
        target: myKPIDefault.goalAchievement.target,
        actual: Math.round(myKPIDefault.goalAchievement.actual * (1 + variation1 * 0.15)),
        hqAvg: Math.round((myKPIDefault.goalAchievement.hqAvg + variation2 * 25) * 10) / 10,
        nationalAvg: myKPIDefault.goalAchievement.nationalAvg,
        vsLastMonth: Math.round((variation1 * 15 + 10) * 10) / 10,
        gap: Math.round(Math.abs(variation1 * 5000)),
        dailyRequired: 0, // 완료된 월이므로 0
        hqRankTotal: {
          rank: Math.max(1, Math.min(50, myKPIDefault.goalAchievement.hqRankTotal.rank + Math.round(variation1 * 8))),
          total: 50
        },
        hqRankRegion: {
          rank: Math.max(1, Math.min(10, myKPIDefault.goalAchievement.hqRankRegion.rank + Math.round(variation2 * 3))),
          total: 10
        }
      },
      designerActivity: {
        current: Math.round((myKPIDefault.designerActivity.current + variation2 * 20) * 10) / 10,
        active: Math.round(myKPIDefault.designerActivity.active * (1 + variation2 * 0.2)),
        total: myKPIDefault.designerActivity.total,
        hqAvg: Math.round((myKPIDefault.designerActivity.hqAvg + variation3 * 15) * 10) / 10,
        nationalAvg: myKPIDefault.designerActivity.nationalAvg,
        vsLastMonth: Math.round(variation2 * 20),
        vsLastMonthPercent: Math.round((variation2 * 8) * 10) / 10,
        plan: myKPIDefault.designerActivity.plan,
        planAchievement: Math.round((100 + variation2 * 25) * 10) / 10
      },
      mobileContract: {
        current: Math.round((myKPIDefault.mobileContract.current + variation3 * 15) * 10) / 10,
        count: Math.round(myKPIDefault.mobileContract.count * (1 + variation3 * 0.3)),
        total: Math.round(myKPIDefault.mobileContract.total * (1 + variation1 * 0.1)),
        hqAvg: Math.round((myKPIDefault.mobileContract.hqAvg + variation1 * 12) * 10) / 10,
        nationalAvg: myKPIDefault.mobileContract.nationalAvg,
        vsLastMonth: Math.round(variation3 * 25),
        vsLastMonthPercent: Math.round((variation3 * 10) * 10) / 10
      }
    };
  };

  // 선택된 월에 따른 myKPI 데이터 가져오고 MMP 변환 적용
  const historicalKPI = getHistoricalKPI(appliedMonth);
  myKPI = {
    ...historicalKPI,
    goalAchievement: {
      ...historicalKPI.goalAchievement,
      target: performanceType === 'MMP' ? historicalKPI.goalAchievement.target / 12 : historicalKPI.goalAchievement.target,
      actual: performanceType === 'MMP' ? historicalKPI.goalAchievement.actual / 12 : historicalKPI.goalAchievement.actual,
      gap: performanceType === 'MMP' ? historicalKPI.goalAchievement.gap / 12 : historicalKPI.goalAchievement.gap,
      dailyRequired: performanceType === 'MMP' ? historicalKPI.goalAchievement.dailyRequired / 12 : historicalKPI.goalAchievement.dailyRequired
    }
  };

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
  const getBranchRankings = (getAllData = false, kpi = 'APE') => {
    const currentMonthData = [
      { agency: '글로벌금융판매', branch: '글로벌화이브스타', achievement: 115.2, ape: 28000000, previousApe: 25000000, isActive: true },
      { agency: '글로벌금융판매', branch: '하나돔', achievement: 112.8, ape: 19000000, previousApe: 17000000, isActive: true },
      { agency: '글로벌금융판매', branch: '리더스에프엔', achievement: 1001.0, ape: 6006000, previousApe: 5000000, isActive: true },
      { agency: '지금용코리아', branch: '서울', achievement: 741.0, ape: 5187000, previousApe: 4500000, isActive: true },
      { agency: '메타리치', branch: '보험스토어', achievement: 103.2, ape: 1260000, previousApe: 1030000, isActive: true },
      { agency: '더블유에셋', branch: '일산센터', achievement: 101.5, ape: 1220000, isActive: true },
      { agency: '글로벌금융판매', branch: '하나돔강북', achievement: 98.9, ape: 1180000, isActive: true },
      { agency: '글로벌금융판매', branch: '리더스일산', achievement: 96.4, ape: 1150000, isActive: true },
      { agency: '지금용코리아', branch: '대원', achievement: 94.7, ape: 850000, isActive: true },
      { agency: '한국지에이금융서비스', branch: '일산지사', achievement: 92.1, ape: 720000, isActive: true },
      { agency: '글로벌금융판매', branch: '화이브스타성화', achievement: 89.8, ape: 580000, isActive: true },
      { agency: '글로벌금융판매', branch: '리더스마이보험체크', achievement: 87.5, ape: 420000, isActive: true },
      { agency: '글로벌금융판매', branch: '이센트럴마포', achievement: 85.2, ape: 380000, isActive: true },
      { agency: '글로벌금융판매', branch: '케이엘아이은평', achievement: 83.1, ape: 280000, isActive: true },
      { agency: '글로벌금옵판매', branch: '케이엘아이운정', achievement: 80.9, ape: 180000, isActive: true },
      { agency: '지금용코리아', branch: '그레이트탑', achievement: 92.5, ape: 120000, isActive: true },
      { agency: '지금용코리아', branch: '사랑', achievement: 89.2, ape: 95000, isActive: true },
      { agency: '메타리치', branch: '골드자산관리센터', achievement: 86.7, ape: 70000, isActive: true },
      { agency: '메타리치', branch: '리치골드', achievement: 84.3, ape: 60000, isActive: true },
      { agency: '지에이스타금융서비스', branch: '부천코어', achievement: 82.1, ape: 1520000, isActive: true },
      { agency: '더블유에셋', branch: '1인지에이 일산2센터', achievement: 78.9, ape: 1820000, isActive: true },
      { agency: '더블유에셋', branch: '기업금융본부', achievement: 76.4, ape: 1750000, isActive: true },
      { agency: '글로벌금융판매', branch: '케이에스드래곤슬', achievement: 74.2, ape: 720000, isActive: true },
      { agency: '글로벌금융판매', branch: '케이에스드래곤행신', achievement: 72.8, ape: 680000, isActive: true },
      { agency: '글로벌금융판매', branch: '수도디아이씨', achievement: 70.5, ape: 650000, isActive: true },
      { agency: '글로벌금융판매', branch: '글로벌인슈몽산', achievement: 95.8, ape: 880000, isActive: true },
      { agency: '글로벌금융판매', branch: '글로벌인슈고양', achievement: 93.4, ape: 850000, isActive: true },
      { agency: '글로벌금융판매', branch: '글로벌인슈에이치', achievement: 91.2, ape: 820000, isActive: true },
      { agency: '글로벌금융판매', branch: '브릿지재무설계', achievement: 88.9, ape: 780000, isActive: true },
      { agency: '글로벌금융판매', branch: '인스라이트서클강북', achievement: 86.7, ape: 750000, isActive: true }
    ];

    const previousMonthData = [
      { agency: '메타리치', branch: '골드자산관리센터', achievement: 118.5, ape: 950000, isActive: true },
      { agency: '글로벌금융판매', branch: '리더스에이치비', achievement: 116.2, ape: 920000, isActive: true },
      { agency: '지에이스타금융서비스', branch: '부천코어', achievement: 114.8, ape: 9.0, isActive: true },
      { agency: '더블유에셋', branch: '서울지사', achievement: 112.3, ape: 880000, isActive: true },
      { agency: '한국지에이금융서비스', branch: '일산지사', achievement: 110.1, ape: 850000, isActive: true },
      { agency: '글로벌금융판매', branch: '케이엘아이케이베스트', achievement: 108.9, ape: 820000, isActive: true },
      { agency: '메타리치', branch: '리치골드', achievement: 107.5, ape: 8.0, isActive: true },
      { agency: '지금용코리아', branch: '그레이트탑', achievement: 106.2, ape: 780000, isActive: true },
      { agency: '더블유에셋', branch: '기업금융본부', achievement: 104.8, ape: 750000, isActive: true },
      { agency: '글로벌금융판매', branch: '브릿지재무설계', achievement: 103.5, ape: 720000, isActive: true },
      { agency: '글로벌금융판매', branch: '굿브즈스카이', achievement: 102.1, ape: 720000, isActive: true },
      { agency: '글로벌금융판매', branch: '인슈에셋자오선', achievement: 100.8, ape: 70, isActive: true },
      { agency: '메타리치', branch: '보험스토어A', achievement: 99.4, ape: 680000, isActive: true },
      { agency: '지금용코리아', branch: '서울A', achievement: 98.1, ape: 650000, isActive: true },
      { agency: '지금용코리아', branch: '대원A', achievement: 96.8, ape: 62, isActive: true },
      { agency: '지금용코리아', branch: '그레이트탑A', achievement: 95.4, ape: 62, isActive: true },
      { agency: '지금용코리아', branch: '사랑A', achievement: 94.1, ape: 58, isActive: true },
      { agency: '더블유에셋', branch: '일산센터A', achievement: 92.8, ape: 58, isActive: true },
      { agency: '더블유에셋', branch: '서울지사A', achievement: 91.4, ape: 55, isActive: true },
      { agency: '더블유에셋', branch: '기업금융본부A', achievement: 90.1, ape: 52, isActive: true },
      { agency: '한국지에이금융서비스', branch: '일산지사A', achievement: 88.8, ape: 52, isActive: true },
      { agency: '메가', branch: '인슈에셋고양', achievement: 87.4, ape: 48, isActive: true },
      { agency: '메가', branch: '인슈에셋고양A', achievement: 86.1, ape: 45, isActive: true },
      { agency: '글로벌금융판매', branch: '하나돔A', achievement: 84.8, ape: 45, isActive: true },
      { agency: '글로벌금융판매', branch: '하나돔강북A', achievement: 83.4, ape: 42, isActive: true },
      { agency: '글로벌금융판매', branch: '리더스에프엔A', achievement: 82.1, ape: 42, isActive: true },
      { agency: '글로벌금융판매', branch: '리더스에이치비A', achievement: 80.8, ape: 38, isActive: true },
      { agency: '글로벌금융판매', branch: '리더스마이보험A', achievement: 79.4, ape: 35, isActive: true },
      { agency: '글로벌금융판매', branch: '리더스일산A', achievement: 78.1, ape: 32, isActive: true },
      { agency: '글로벌금융판매', branch: '케이엘아이케이베스트A', achievement: 76.8, ape: 28, isActive: true }
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

    // KPI에 따른 데이터 변환 (MMP일 때 12로 나눔)
    const transformedResult = result.map(branch => ({
      ...branch,
      ape: kpi === 'MMP' ? Math.round(branch.ape / 12) : branch.ape,
      previousApe: branch.previousApe ? (kpi === 'MMP' ? Math.round(branch.previousApe / 12) : branch.previousApe) : branch.previousApe
    }));

    // 가동 현황 정보와 함께 반환
    return {
      data: transformedResult,
      branchStats: {
        total: totalBranchesForStats,
        active: activeBranchesCountForStats,
        activityRate: activityRate
      }
    } as any;
  };
  
  // 일별 데이터 - 월별로 다른 일수, APE/MMP 기준 적용
  const getDailyData = () => {
    const multiplier = performanceType === 'MMP' ? (1/12) : 1; // MMP = APE/12
    const selectedMonth = parseInt(appliedMonth.split('-')[1]);
    const selectedYear = parseInt(appliedMonth.split('-')[0]);

    // 월별 총 일수 및 영업일 패턴 정의
    const monthInfo = {
      1: { totalDays: 31, weekends: [4,5,11,12,18,19,25,26] }, // 1월
      2: { totalDays: 28, weekends: [1,2,8,9,15,16,22,23] }, // 2월
      3: { totalDays: 31, weekends: [1,2,8,9,15,16,22,23,29,30] }, // 3월
      4: { totalDays: 30, weekends: [5,6,12,13,19,20,26,27] }, // 4월
      5: { totalDays: 31, weekends: [3,4,10,11,17,18,24,25,31] }, // 5월
      6: { totalDays: 30, weekends: [1,7,8,14,15,21,22,28,29] }, // 6월
      7: { totalDays: 31, weekends: [5,6,12,13,19,20,26,27] }, // 7월
      8: { totalDays: 31, weekends: [2,3,9,10,16,17,23,24,30,31] }, // 8월
      9: { totalDays: 30, weekends: [1,7,8,14,15,21,22,28,29] }, // 9월 (현재 월)
      10: { totalDays: 31, weekends: [5,6,12,13,19,20,26,27] }, // 10월
      11: { totalDays: 30, weekends: [2,3,9,10,16,17,23,24,30] }, // 11월
      12: { totalDays: 31, weekends: [1,7,8,14,15,21,22,28,29] }  // 12월
    };

    const currentMonthInfo = monthInfo[selectedMonth as keyof typeof monthInfo] || monthInfo[9];
    const totalDays = currentMonthInfo.totalDays;
    const weekendDays = new Set(currentMonthInfo.weekends);

    // 현재 월인 경우 현재 날짜까지만, 과거/미래 월인 경우 전체 월
    const maxDay = (selectedMonth === 9 && selectedYear === 2025) ? 20 : totalDays; // 현재는 9월 20일까지

    // 동적으로 데이터 생성
    const generateMonthData = (baseValues: {ape: number, contract: number, proposal: number}) => {
      const data = [];

      // 9월 영업일의 지수 형태 패턴 (월초 낮고 월말로 갈수록 증가)
      const septemberPattern = [
        0.3, 0.4, 0.5, 0.6, 0.7, // 1주차: 월수목금 (2,3,4,5일) - 낮은 실적
        0.8, 0.9, 1.0, 1.2, 1.4, // 2주차: 월화수목금 (9,10,11,12,13일) - 점진적 증가
        1.6, 1.9, 2.2, 2.5, 2.8  // 3주차: 월화수목금 (16,17,18,19,20일) - 급격히 증가
      ];

      let businessDayIndex = 0;

      for (let day = 1; day <= maxDay; day++) {
        const isWeekend = weekendDays.has(day);
        if (isWeekend) {
          data.push({
            day,
            apeAmount: 0,
            contractCount: 0,
            proposalCount: 0,
            isWeekend: true
          });
        } else {
          // 자연스러운 패턴 적용
          const patternFactor = septemberPattern[businessDayIndex] || 1.0;
          businessDayIndex++;

          data.push({
            day,
            apeAmount: Math.round(baseValues.ape * patternFactor),
            contractCount: Math.round(baseValues.contract * patternFactor),
            proposalCount: Math.round(baseValues.proposal * patternFactor),
            isWeekend: false
          });
        }
      }
      return data;
    };

    const baseData = {
      '전체': generateMonthData({ape: 23, contract: 30, proposal: 51}),
      '건강': generateMonthData({ape: 15, contract: 20, proposal: 33}),
      '종신/정기': generateMonthData({ape: 8, contract: 10, proposal: 18})
    };

    const data = (baseData as any)[selectedProduct] || baseData['전체'];
    // MMP일 때 apeAmount를 12로 나누기
    return data.map((item: any) => ({
      ...item,
      apeAmount: item.apeAmount * multiplier
    }));
  };
  
  // 필터별 데이터
  const getFilteredData = (key: string) => {
    const baseData = performanceType === 'APE' ? {
      ape: { '전체': 35000, '건강': 22750, '종신/정기': 12250 }, // 만원 단위 (350백만원)
      dailyApe: { '전체': 2330, '건강': 1515, '종신/정기': 815 }, // 만원 단위 (일평균)
      apeGrowth: { '전체': 15.3, '건강': 18.7, '종신/정기': 11.2 },
      apeGrowthAmount: { '전체': 4100, '건강': 3200, '종신/정기': 900 }, // 전월 동기 대비 절대 증가분 (만원)
      dailyApeAmount: { '전체': 1600, '건강': 1100, '종신/정기': 500 },
      apeRatio: { '전체': 100, '건강': 65, '종신/정기': 35 },
      dailyApeGrowth: { '전체': 8.7, '건강': 12.3, '종신/정기': 5.8 },
      design: { '전체': 771, '건강': 500, '종신/정기': 271 },
      dailyDesign: { '전체': 25, '건강': 16, '종신/정기': 9 },
      designGrowth: { '전체': -8, '건강': -5, '종신/정기': -3 },
      contract: { '전체': 455, '건강': 295, '종신/정기': 160 },
      dailyContract: { '전체': 15, '건강': 10, '종신/정기': 5 },
      contractGrowth: { '전체': 12, '건강': 18, '종신/정기': 8 }
    } : {
      // MMP 기준 데이터 (APE/12)
      ape: { '전체': Math.round(31000/12), '건강': Math.round(20100/12), '종신/정기': Math.round(10900/12) }, // MMP 만원 단위
      dailyApe: { '전체': Math.round(1600/12), '건강': Math.round(1100/12), '종신/정기': Math.round(500/12) }, // MMP 만원 단위
      apeGrowth: { '전체': 15.3, '건강': 18.7, '종신/정기': 11.2 }, // 성장률은 동일
      apeGrowthAmount: { '전체': Math.round(4100/12), '건강': Math.round(3200/12), '종신/정기': Math.round(900/12) }, // 전월 동기 대비 절대 증가분 (만원)
      dailyApeAmount: { '전체': Math.round(1600/12), '건강': Math.round(1100/12), '종신/정기': Math.round(500/12) },
      apeRatio: { '전체': 100, '건강': 65, '종신/정기': 35 },
      dailyApeGrowth: { '전체': 8.7, '건강': 12.3, '종신/정기': 5.8 },
      design: { '전체': 771, '건강': 500, '종신/정기': 271 },
      dailyDesign: { '전체': 25, '건강': 16, '종신/정기': 9 },
      designGrowth: { '전체': -8, '건강': -5, '종신/정기': -3 },
      contract: { '전체': 455, '건강': 295, '종신/정기': 160 },
      dailyContract: { '전체': 15, '건강': 10, '종신/정기': 5 },
      contractGrowth: { '전체': 12, '건강': 18, '종신/정기': 8 }
    };
    return (baseData as any)[key][selectedProduct] || 0;
  };
  
  // 상품 포트폴리오 데이터 (금액: MMP 백만원 단위)
  const getPortfolioData = () => {
    if (selectedProduct === '전체') {
      return [
        { name: '건강', value: 38.4, color: '#3b82f6', amount: 161000000, count: 339 }, // 8.8+0.9+0+1.2+4.5 = 16.1, 200+10+0+24+105 = 339
        { name: '종신/정기', value: 61.6, color: '#10b981', amount: 267000000, count: 118 } // 24.9+1.7+0.1 = 26.7, 114+3+1 = 118
      ];
    } else if (selectedProduct === '건강') {
      return [
        { name: '치아', value: 54.7, color: '#3b82f6', amount: 88000000, count: 200 },
        { name: '새담', value: 27.9, color: '#60a5fa', amount: 45000000, count: 105 },
        { name: '골담', value: 7.5, color: '#93c5fd', amount: 12000000, count: 24 },
        { name: '치매', value: 5.6, color: '#bfdbfe', amount: 9000000, count: 10 },
        { name: '암', value: 0, color: '#dbeafe', amount: 0, count: 0 },
        { name: '다이나믹', value: 4.3, color: '#eff6ff', amount: 7000000, count: 15 } // 대치값
      ];
    } else {
      return [
        { name: '저해지', value: 93.3, color: '#10b981', amount: 249000000, count: 114 },
        { name: '무해지', value: 6.4, color: '#34d399', amount: 17000000, count: 3 },
        { name: '정기', value: 0.4, color: '#6ee7b7', amount: 1000000, count: 1 }
      ];
    }
  };
  
  // Top 3 상품 데이터 (APE 기준: MMP * 12)
  const getTopProducts = () => {
    const productData = {
      '전체': {
        byAmount: [
          { rank: 1, name: 'THE건강해지는종신보험(기본형)', amount: '299', count: '285건' }, // 24.9 * 12 = 298.8 → 299
          { rank: 2, name: 'THE건강한치아보험V(갱신형)', amount: '106', count: '412건' }, // 8.8 * 12 = 105.6 → 106
          { rank: 3, name: '새담간편건강보험', amount: '54', count: '198건' } // 4.5 * 12 = 54
        ],
        byCount: [
          { rank: 1, name: 'THE건강한치아보험V(갱신형)', amount: '106', count: '412건' },
          { rank: 2, name: 'THE건강해지는종신보험(기본형)', amount: '299', count: '285건' },
          { rank: 3, name: '새담간편건강보험', amount: '54', count: '256건' }
        ]
      },
      '건강': {
        byAmount: [
          { rank: 1, name: 'THE건강한치아보험V(갱신형)', amount: '106', count: '412건' },
          { rank: 2, name: '새담간편건강보험', amount: '54', count: '198건' },
          { rank: 3, name: '골라담간편건강보험Ⅱ(갱신형)', amount: '14', count: '156건' } // 1.2 * 12 = 14.4 → 14
        ],
        byCount: [
          { rank: 1, name: 'THE건강한치아보험V(갱신형)', amount: '106', count: '412건' },
          { rank: 2, name: '새담간편건강보험', amount: '54', count: '198건' },
          { rank: 3, name: '선심속치매보험(해약환급금미지급형)', amount: '11', count: '186건' } // 0.9 * 12 = 10.8 → 11
        ]
      },
      '종신/정기': {
        byAmount: [
          { rank: 1, name: 'THE건강해지는종신보험(기본형)', amount: '299', count: '285건' },
          { rank: 2, name: 'THE채우는종신보험(해약환급금일부지급형)', amount: '20', count: '198건' }, // 1.7 * 12 = 20.4 → 20
          { rank: 3, name: 'THE건강해지는건강정기보험', amount: '1', count: '142건' } // 0.1 * 12 = 1.2 → 1
        ],
        byCount: [
          { rank: 1, name: 'THE건강해지는종신보험(기본형)', amount: '299', count: '285건' },
          { rank: 2, name: 'THE간편고지종신보험(해약환급금미지급형)', amount: '20', count: '215건' },
          { rank: 3, name: 'THE건강해지는건강정기보험', amount: '1', count: '198건' }
        ]
      }
    };
    
    return (productData as any)[selectedProduct][productSortBy === 'amount' ? 'byAmount' : 'byCount'];
  };

  // 모달 리사이즈 핸들러
  const handleResizeStart = (e: React.MouseEvent, direction: string) => {
    e.preventDefault();
    setIsResizing(true);
    setResizeStart({
      x: e.clientX,
      y: e.clientY,
      width: modalSize.width,
      height: modalSize.height
    });

    const handleMouseMove = (e: MouseEvent) => {
      if (!isResizing) return;

      const deltaX = e.clientX - resizeStart.x;
      const deltaY = e.clientY - resizeStart.y;

      let newWidth = modalSize.width;
      let newHeight = modalSize.height;

      if (direction.includes('right')) {
        newWidth = Math.max(300, resizeStart.width + deltaX);
      }
      if (direction.includes('left')) {
        newWidth = Math.max(300, resizeStart.width - deltaX);
      }
      if (direction.includes('bottom')) {
        newHeight = Math.max(200, resizeStart.height + deltaY);
      }
      if (direction.includes('top')) {
        newHeight = Math.max(200, resizeStart.height - deltaY);
      }

      setModalSize({ width: newWidth, height: newHeight });
    };

    const handleMouseUp = () => {
      setIsResizing(false);
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
  };

  // 지점 클릭 핸들러
  const handleBranchClick = (agency: string, branchName: string) => {
    const encodedAgency = encodeURIComponent(agency);
    const encodedBranch = encodeURIComponent(branchName);
    const queryParams = new URLSearchParams({
      period: appliedMonth,
      year: selectedYear,
      kpi: selectedKPI,
      product: selectedProduct
    });
    navigate(`/branch/${encodedAgency}/${encodedBranch}?${queryParams.toString()}`);
  };

  // 방문 추천 지점 클릭 핸들러
  const handleVisitBranchClick = (agency: string, branchName: string) => {
    const encodedAgency = encodeURIComponent(agency);
    const encodedBranch = encodeURIComponent(branchName);
    const queryParams = new URLSearchParams({
      period: appliedMonth,
      year: selectedYear,
      kpi: selectedKPI,
      product: selectedProduct
    });
    navigate(`/branch/${encodedAgency}/${encodedBranch}?${queryParams.toString()}`);
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
        {/* 타이틀 및 현재 정보 표시 영역 */}
        <div className="px-6 py-4 border-b border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-xl font-bold text-gray-900 mb-1">통합 인사이트 뷰</h1>
              <div className="text-sm text-black">
                <span className="">강남본부 김영수 지점장</span>
                <span className="ml-3 text-black">
                  {isCurrentMonth ? (
                    <>2025.09.19 마감 기준</>
                  ) : (
                    <>{appliedMonth.split('-')[0]}.{appliedMonth.split('-')[1]} 마감일 기준</>
                  )}
                </span>
              </div>
            </div>
            <div className="text-right">
              {isCurrentMonth && (
                <>
                  <div className="text-sm text-black">2025.09.20(금)</div>
                  <div className="text-xs text-gray-400 mt-1">
                    9월 영업일: {businessDays.elapsed}일/{businessDays.total}일 (잔여 {businessDays.remaining}일)
                  </div>
                </>
              )}
            </div>
          </div>
        </div>

        {/* 조회 조건 및 액션 영역 */}
        <div className="px-6 py-3 bg-gray-50">
          <div className="flex items-center justify-between">
            {/* 조회 조건 그룹 */}
            <div className="flex items-center space-x-3">
              {/* 조회년월 선택 */}
              <div className="flex items-center space-x-3">
                <span className="text-sm  text-gray-700 min-w-0">조회년월</span>
                <select
                  value={tempSelectedMonth}
                  onChange={(e) => setTempSelectedMonth(e.target.value)}
                  className="px-3 py-2 bg-white border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 min-w-32"
                >
                  {monthOptions.map(option => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>

              {/* 조회 버튼 */}
              <button
                onClick={handleSearchClick}
                className="px-3 py-1.5 bg-gray-400 hover:bg-gray-500 text-white text-sm  rounded-lg flex items-center space-x-1.5 transition-colors"
              >
                <Search className="w-4 h-4" />
                <span>조회</span>
              </button>
            </div>

            {/* 액션 버튼 그룹 */}
            <div className="flex items-center space-x-3">
              {/* 실적 기준 선택 */}
              <div className="flex items-center space-x-3">
                <span className="text-sm  text-gray-700">실적 기준</span>
                <div className="flex items-center bg-white border border-gray-300 rounded-lg">
                  <label className="flex items-center px-3 py-2 cursor-pointer">
                    <input
                      type="radio"
                      name="performanceType"
                      value="APE"
                      checked={performanceType === 'APE'}
                      onChange={() => setPerformanceType('APE')}
                      className="mr-2 text-blue-600 focus:ring-blue-500"
                    />
                    <span className="text-sm">APE</span>
                  </label>
                  <div className="w-px h-6 bg-gray-300"></div>
                  <label className="flex items-center px-3 py-2 cursor-pointer">
                    <input
                      type="radio"
                      name="performanceType"
                      value="MMP"
                      checked={performanceType === 'MMP'}
                      onChange={() => setPerformanceType('MMP')}
                      className="mr-2 text-blue-600 focus:ring-blue-500"
                    />
                    <span className="text-sm">MMP</span>
                  </label>
                </div>
              </div>

              <button className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white text-sm  rounded-lg flex items-center space-x-2 transition-colors">
                <Download className="w-4 h-4" />
                <span>원클릭 엑셀 다운로드</span>
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
            <div className="bg-white rounded-lg shadow-sm border p-6 relative">
              <div className="flex justify-between items-start mb-4 border-b border-gray-100 pb-2">
                <h3 className="text-base font-bold text-gray-800">목표달성률</h3>
                <span className="text-xs text-black">{performanceType} 기준</span>
              </div>

              <div className="text-center mb-4">
                <div className="text-5xl font-black text-blue-600 mb-2">{myKPI.goalAchievement.current.toFixed(1)}%</div>
                <div className="text-sm text-black  mb-4">
                  {formatCurrency(myKPI.goalAchievement.actual, performanceType)} / {formatCurrency(myKPI.goalAchievement.target, performanceType)}
                </div>

                <div
                  className="w-full bg-gray-200 rounded-full h-5 mb-2 relative group"
                  onMouseEnter={() => setShowProgressTooltip(true)}
                  onMouseLeave={() => setShowProgressTooltip(false)}
                >
                  <div
                    className="bg-blue-500 h-5 rounded-full transition-all"
                    style={{width: `${myKPI.goalAchievement.current}%`}}
                  ></div>
                  {/* 프로그레스 바 툴팁 */}
                  {showProgressTooltip && (
                    <div
                      className="absolute -top-16 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xs rounded px-3 py-2 whitespace-nowrap z-20 shadow-lg text-left"
                    >
                      <div>9월 - {performanceType}</div>
                      <div>NB Plan: {Math.round(myKPI.goalAchievement.target).toLocaleString()}원</div>
                      <div>Actual: {Math.round(myKPI.goalAchievement.actual).toLocaleString()}원</div>
                      <div>{myKPI.goalAchievement.current.toFixed(1)}% 달성</div>
                      <div className="text-yellow-300">전체평균 {myKPI.goalAchievement.hqAvg}%</div>
                      <div className="absolute top-full left-1/2 transform -translate-x-1/2 border-4 border-transparent border-t-gray-800"></div>
                    </div>
                  )}
                  {/* 전체 평균선 (65%) */}
                  <div
                    className="absolute top-0 h-5 w-0.5 bg-orange-500 z-10"
                    style={{left: `65%`}}
                  />
                </div>

                {/* 평균 표시 텍스트 */}
                <div className="relative mb-4">
                  <div className="text-xs text-orange-600 text-center" style={{marginLeft: `65%`, transform: 'translateX(-50%)'}}>평균</div>
                </div>

                <div className="mb-4 h-4"></div>
              </div>
              
              <div className="grid grid-cols-2 gap-3 mb-4">
                <div className="text-left">
                  <div className="text-xs text-black mb-1">전월 동기 대비</div>
                  {shouldShowLastMonthComparison ? (
                    <>
                      <div className={`font-semibold text-lg ${myKPI.goalAchievement.vsLastMonth > 0 ? 'text-blue-600' : 'text-red-600'}`}>
                        {myKPI.goalAchievement.vsLastMonth > 0 ? '▲ ' : '▼ '}{Math.abs(myKPI.goalAchievement.vsLastMonth)}%p
                      </div>
                      <div className={`text-xs ${myKPI.goalAchievement.vsLastMonth > 0 ? 'text-blue-600' : 'text-red-600'}`}>
                        {myKPI.goalAchievement.vsLastMonth > 0 ? '+' : ''}{formatCurrency((myKPI.goalAchievement.actual * myKPI.goalAchievement.vsLastMonth / 100), performanceType)}
                      </div>
                    </>
                  ) : (
                    <div className="relative group">
                      <div className="font-semibold text-lg text-gray-400 cursor-help">
                        -
                      </div>
                      {/* 툴팁 */}
                      <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 bg-gray-800 text-white text-xs rounded px-3 py-2 whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-30">
                        전월 동기 대비는 잔여 영업일 10일부터 표시됩니다
                        <div className="absolute top-full left-1/2 transform -translate-x-1/2 border-4 border-transparent border-t-gray-800"></div>
                      </div>
                    </div>
                  )}
                </div>
                <div className="text-right">
                  <div className="text-xs text-black mb-1">목표까지</div>
                  <div className="font-semibold text-lg text-blue-600">{formatCurrency(myKPI.goalAchievement.gap, performanceType)}</div>
                  <div className="text-xs text-black">
                    {myKPI.goalAchievement.actual >= myKPI.goalAchievement.target ? '목표 달성!' : '남은 금액'}
                  </div>
                </div>
              </div>


              {/* 하루 평균 필요 금액 안내 - 현재월에만 표시 */}
              {isCurrentMonth && (
                <div className="bg-blue-50 rounded-lg p-4 border border-blue-200 shadow-sm">
                  <div className="text-sm  text-blue-800 text-center">
                    <div className="mb-1">이번달 목표 달성을 위해</div>
                    <div>
                      하루 평균
                      <div className="inline-block mx-1 px-2 py-1 bg-blue-600 text-white rounded-md font-bold text-base">
                        {formatCurrency(myKPI.goalAchievement.dailyRequired, performanceType)}
                      </div>
                      이 필요해요!
                    </div>
                  </div>
                </div>
              )}
              
              <div className="grid grid-cols-2 gap-3 mt-4 pt-3 border-t">
                <div className="text-center">
                  <div className="text-xs text-black">본부 순위</div>
                  <div className="font-semibold text-blue-600">{myKPI.goalAchievement.hqRankRegion.rank}위<span className="text-black">/{myKPI.goalAchievement.hqRankRegion.total}명</span></div>
                </div>
                <div className="text-center">
                  <div className="text-xs text-black">전체 순위</div>
                  <div className="font-semibold text-blue-600">{myKPI.goalAchievement.hqRankTotal.rank}위<span className="text-black">/{myKPI.goalAchievement.hqRankTotal.total}명</span></div>
                </div>
              </div>
            </div>

            {/* 설계사 가동률 & 모바일 청약률 - 보조 지표 */}
            <div className="grid grid-cols-2 gap-3">
              <div className="bg-white rounded-lg shadow-sm border p-4">
                <h4 className="text-sm font-semibold text-gray-700 mb-3">설계사 가동률</h4>
                <div className="text-center mb-3">
                  <div className="text-2xl font-bold text-blue-600">{myKPI.designerActivity.current.toFixed(1)}%</div>
                  <div className="text-xs text-black">({myKPI.designerActivity.active}/{myKPI.designerActivity.plan}명)</div>
                </div>
                <div className="text-center">
                  <span className="text-xs text-black">전월 동기 대비 </span>
                  <span className="text-sm  text-red-600">▼ 3명</span>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow-sm border p-4">
                <h4 className="text-sm font-semibold text-gray-700 mb-3">모바일 청약률</h4>
                <div className="text-center mb-3">
                  <div className="text-2xl font-bold text-blue-600">{myKPI.mobileContract.current.toFixed(1)}%</div>
                  <div className="text-xs text-black">({myKPI.mobileContract.count}/{myKPI.mobileContract.total}건)</div>
                </div>
                <div className="text-center">
                  <span className="text-xs text-black">전월 동기 대비 </span>
                  <span className="text-sm text-blue-600">▲ {myKPI.mobileContract.vsLastMonthPercent}%p</span>
                </div>
              </div>
            </div>


            {/* 월별 성과 추이 (이번 달까지) */}
            <div className="bg-white rounded-lg shadow-sm border p-4 mb-4">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-semibold text-gray-700">{appliedMonth.split('-')[0]}년 월별 성과</h3>

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
                        className={`px-3 py-1 text-xs  rounded transition-colors ${
                          selectedKPI === kpi.key
                            ? 'bg-white text-gray-900 shadow-sm'
                            : 'text-black hover:text-gray-900'
                        }`}
                      >
                        {kpi.label}
                      </button>
                    ))}
                  </div>

                </div>
              </div>
              
              <div className="h-60 relative bg-gray-50 rounded-lg p-4" onMouseLeave={() => setHoveredData(null)}>
                {/* % 표시 - 오른쪽 상단, 텍스트 겹침 방지 */}
                <div className="absolute top-2 right-2 text-xs text-black bg-gray-50 px-1">(%)</div>

                {/* 막대 그래프 */}
                <div className="flex items-end justify-center gap-3 h-full relative" style={{paddingTop: '20px'}}>
                  {getKPIData().map((data: any, idx: number) => {
                    const maxScale = getMaxValue(getKPIData(), selectedKPI);
                    const barHeight = Math.min((data.value / maxScale) * 140, 140);
                    const avgHeight = Math.min((data.hqAvg / maxScale) * 140, 140);

                    return (
                      <div key={idx} className="flex flex-col items-center relative" style={{height: '180px', width: '52px'}}>
                        {/* 차트 영역 */}
                        <div className="relative flex justify-center" style={{height: '140px', width: '100%'}}>
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
                            className="absolute text-xs text-black transform -translate-x-1/2 left-1/2"
                            style={{bottom: `${barHeight + 2}px`, fontSize: '10px'}}
                          >
                            {Math.round(data.value)}
                          </div>
                        </div>
                        
                        {/* 월 라벨 */}
                        <div className="text-xs text-black mt-2" style={{fontSize: '10px'}}>
                          {data.month}
                        </div>
                        
                        {/* 툴팁 */}
                        {hoveredData && hoveredData.idx === idx && (
                          <div className="absolute top-0 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xs rounded px-2 py-1 whitespace-nowrap z-20">
                            {selectedKPI === 'nb_plan' ? (
                              <div>
                                <div>{data.month} - {performanceType}</div>
                                <div>NB Plan: {(data.target * 10000).toLocaleString()}원</div>
                                <div>Actual: {(data.actual * 10000).toLocaleString()}원</div>
                                <div>{data.value.toFixed(1)}% 달성</div>
                                <div className="text-yellow-300">전체평균 {data.hqAvg}%</div>
                              </div>
                            ) : selectedKPI === 'activity_plan' ? (
                              <div>
                                <div>{data.month}</div>
                                <div>가동 Plan: {data.target}명</div>
                                <div>Actual: {data.active}명</div>
                                <div>{data.value.toFixed(1)}% 달성</div>
                                <div className="text-yellow-300">전체평균 {data.hqAvg}%</div>
                              </div>
                            ) : (
                              <div>
                                <div>{data.month}</div>
                                <div>{data.value.toFixed(1)}% ({data.count}/{data.total}건)</div>
                                <div className="text-yellow-300">전체평균 {data.hqAvg}%</div>
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
                    <span>전체평균 이상</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-3 h-3 bg-red-400 mr-1 rounded"></div>
                    <span>전체평균 미달</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-6 h-0.5 bg-yellow-500 border-t-2 border-yellow-500 border-dashed mr-1"></div>
                    <span>전체평균</span>
                  </div>
                </div>
              </div>
            </div>

            {/* 최근 3개년 연간 성과 추이 */}
            <div className="bg-white rounded-lg shadow-sm border p-4 mt-4">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-semibold text-gray-700">최근 3개년 연도별 성과</h3>

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
                        onClick={() => setYearlyKPI(kpi.key)}
                        className={`px-3 py-1 text-xs  rounded transition-colors ${
                          yearlyKPI === kpi.key
                            ? 'bg-white text-gray-900 shadow-sm'
                            : 'text-black hover:text-gray-900'
                        }`}
                      >
                        {kpi.label}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <div className="h-52 relative bg-gray-50 rounded-lg p-4" onMouseLeave={() => setHoveredYearlyData(null)}>
                {/* % 표시 - 오른쪽 상단, 텍스트 겹침 방지 */}
                <div className="absolute top-2 right-2 text-xs text-black bg-gray-50 px-1">(%)</div>

                {/* 막대 그래프 */}
                <div className="flex items-end justify-center gap-8 h-full relative" style={{paddingTop: '20px'}}>
                  {(() => {
                    // 연간 성과 데이터 생성 (달성/전체로 %를 계산)
                    const yearlyData = [
                      {
                        year: '2023',
                        nb_plan: 89.5,     // 목표달성률
                        activity_plan: 82.3,  // 설계사 가동률
                        mobile_contract: 67.8, // 모바일 청약률
                        nb_plan_achieved: 4250,
                        nb_plan_target: 4750,
                        activity_achieved: 82,
                        activity_total: 100,
                        mobile_achieved: 678,
                        mobile_total: 1000,
                        nb_plan_avg: 85.2,      // 전체 평균
                        activity_plan_avg: 80.5,
                        mobile_contract_avg: 71.3
                      },
                      {
                        year: '2024',
                        nb_plan: 92.1,
                        activity_plan: 85.6,
                        mobile_contract: 74.2,
                        nb_plan_achieved: 4605,
                        nb_plan_target: 5000,
                        activity_achieved: 86,
                        activity_total: 100,
                        mobile_achieved: 742,
                        mobile_total: 1000,
                        nb_plan_avg: 87.3,
                        activity_plan_avg: 82.1,
                        mobile_contract_avg: 73.8
                      },
                      {
                        year: '2025',
                        nb_plan: 76.8,    // 진행중인 올해 (9월까지)
                        activity_plan: 78.4,
                        mobile_contract: 81.5,
                        nb_plan_achieved: 3456,
                        nb_plan_target: 4500,
                        activity_achieved: 78,
                        activity_total: 100,
                        mobile_achieved: 815,
                        mobile_total: 1000,
                        nb_plan_avg: 80.5,
                        activity_plan_avg: 79.2,
                        mobile_contract_avg: 76.4
                      }
                    ];

                    const maxValue = Math.max(...yearlyData.map(d => d[yearlyKPI]));

                    return yearlyData.map((data, idx) => {
                      const value = data[yearlyKPI];
                      const avgValue = data[`${yearlyKPI}_avg`];
                      const barHeight = Math.min((value / maxValue) * 120, 120);
                      const avgHeight = Math.min((avgValue / maxValue) * 120, 120);

                      return (
                        <div key={idx} className="flex flex-col items-center relative" style={{height: '160px', width: '80px'}}>
                          {/* 차트 영역 */}
                          <div className="relative flex justify-center" style={{height: '120px', width: '100%'}}>
                            {/* 전체 평균 노란선 */}
                            <div
                              className="absolute border-t border-yellow-500 border-dashed z-10"
                              style={{bottom: `${avgHeight}px`, left: '-10px', right: '-10px'}}
                            />

                            {/* 막대 - 평균 이상/미달에 따른 색상 */}
                            <div
                              className={`w-8 ${
                                value >= avgValue ? 'bg-blue-500' : 'bg-red-400'
                              } rounded-t hover:opacity-80 transition-opacity cursor-pointer absolute bottom-0`}
                              style={{height: `${barHeight}px`}}
                              onMouseEnter={() => setHoveredYearlyData({...data, idx, value, avgValue})}
                            />

                            {/* 막대 바로 위 수치 */}
                            <div
                              className="absolute text-xs text-black transform -translate-x-1/2 left-1/2"
                              style={{bottom: `${barHeight + 2}px`, fontSize: '10px'}}
                            >
                              {Math.round(value)}
                            </div>
                          </div>

                          {/* 년도 라벨 */}
                          <div className="text-xs text-black mt-2 whitespace-nowrap" style={{fontSize: '10px'}}>
                            {data.year === '2025' ? '2025년 (~9월)' : `${data.year}년`}
                          </div>

                          {/* 툴팁 */}
                          {hoveredYearlyData && hoveredYearlyData.idx === idx && (
                            <div className="absolute top-0 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xs rounded px-2 py-1 whitespace-nowrap z-20">
                              {yearlyKPI === 'nb_plan' ? (
                                <div>
                                  <div>{data.year === '2025' ? '2025년 (~9월)' : `${data.year}년`} - {performanceType}</div>
                                  <div>NB Plan: {(data.nb_plan_target * 10000).toLocaleString()}원</div>
                                  <div>Actual: {(data.nb_plan_achieved * 10000).toLocaleString()}원</div>
                                  <div>{value.toFixed(1)}% 달성</div>
                                  <div className="text-yellow-300">전체평균 {avgValue.toFixed(1)}%</div>
                                </div>
                              ) : yearlyKPI === 'activity_plan' ? (
                                <div>
                                  <div>{data.year === '2025' ? '2025년 (~9월)' : `${data.year}년`}</div>
                                  <div>가동 Plan: {data.activity_total}명</div>
                                  <div>Actual: {data.activity_achieved}명</div>
                                  <div>{value.toFixed(1)}% 달성</div>
                                  <div className="text-yellow-300">전체평균 {avgValue.toFixed(1)}%</div>
                                </div>
                              ) : (
                                <div>
                                  <div>{data.year === '2025' ? '2025년 (~9월)' : `${data.year}년`}</div>
                                  <div>{value.toFixed(1)}% ({data.mobile_achieved}/{data.mobile_total}건)</div>
                                  <div className="text-yellow-300">전체평균 {avgValue.toFixed(1)}%</div>
                                </div>
                              )}
                            </div>
                          )}
                        </div>
                      );
                    });
                  })()}
                </div>
              </div>

              {/* 범례 */}
              <div className="flex items-center justify-center mt-4">
                <div className="flex items-center gap-4 text-xs">
                  <div className="flex items-center">
                    <div className="w-3 h-3 bg-blue-500 mr-1 rounded"></div>
                    <span>전체평균 이상</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-3 h-3 bg-red-400 mr-1 rounded"></div>
                    <span>전체평균 미달</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-6 h-0.5 bg-yellow-500 border-t-2 border-yellow-500 border-dashed mr-1"></div>
                    <span>전체평균</span>
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
                    className={`px-3 py-1 text-xs  rounded transition-colors ${
                      selectedProduct === product
                        ? 'bg-white text-gray-900 shadow-sm'
                        : 'text-black hover:text-gray-900'
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
                <h4 className="text-sm font-semibold text-gray-700 mb-3">{performanceType}</h4>
                <div className="text-center mb-3 relative group">
                  <div className="text-2xl font-bold text-blue-600">{formatCurrency(getFilteredData('ape') * 10000, performanceType)}</div>
                  <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 hidden group-hover:block bg-gray-800 text-white text-xs py-1 px-2 rounded whitespace-nowrap z-10">
                    {(getFilteredData('ape') * 10000).toLocaleString()}원
                  </div>
                </div>
                <div className="text-center">
                  <span className="text-xs text-black">전월 동기 대비 </span>
                  <span className="text-sm text-blue-600 relative group">
                    ▲ {formatCurrency(getFilteredData('apeGrowthAmount') * 10000, performanceType)}
                    <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 hidden group-hover:block bg-gray-800 text-white text-xs py-1 px-2 rounded whitespace-nowrap z-10">
                      {(getFilteredData('apeGrowthAmount') * 10000).toLocaleString()}원
                    </div>
                  </span>
                </div>
              </div>
              
              {/* 설계 건수 & 청약 건수 - 체결률 화살표 포함 */}
              <div className="flex items-center gap-2">
                {/* 설계 카드 */}
                <div className="bg-white rounded-lg shadow-sm border p-4 flex-1">
                  <h4 className="text-sm font-semibold text-gray-700 mb-3">설계</h4>
                  <div className="text-center mb-3">
                    <div className="text-2xl font-bold text-blue-600">{getFilteredData('design')}<span className="text-base text-black">건</span></div>
                  </div>
                  <div className="text-center">
                    <span className="text-xs text-black">전월 동기 대비 </span>
                    <span className="text-sm text-red-600">▼ {Math.abs(getFilteredData('designGrowth'))}건</span>
                  </div>
                </div>

                {/* 체결률 화살표 */}
                {(() => {
                  const designCount = getFilteredData('design');
                  const contractCount = getFilteredData('contract');
                  const conversionRate = Math.round((contractCount / designCount) * 100);

                  return (
                    <div className="flex flex-col items-center px-2">
                      <div className="text-2xl">→</div>
                      <div className="text-center">
                        <div className={`text-lg font-bold ${
                          conversionRate >= 60 ? 'text-black' :
                          conversionRate >= 40 ? 'text-yellow-600' :
                          'text-red-600'
                        }`}>
                          {conversionRate}%
                        </div>
                        <div className="text-xs text-black whitespace-nowrap">청약률</div>
                      </div>
                    </div>
                  );
                })()}

                {/* 청약 카드 */}
                <div
                  className="bg-white rounded-lg shadow-sm border p-4 flex-1 relative cursor-pointer hover:shadow-md transition-shadow"
                  onMouseEnter={() => setShowConversionTooltip(true)}
                  onMouseLeave={() => setShowConversionTooltip(false)}
                >
                  <h4 className="text-sm font-semibold text-gray-700 mb-3">청약</h4>
                  <div className="text-center mb-3">
                    <div className="text-2xl font-bold text-blue-600">{getFilteredData('contract')}<span className="text-base text-black">건</span></div>
                  </div>

                  {/* 호버 툴팁 */}
                  {showConversionTooltip && (() => {
                    const contractCount = getFilteredData('contract');
                    const rejectedCount = 24; // 거절 24건
                    const withdrawnCount = 8; // 철회 8건

                    return (
                      <div className="absolute -top-2 left-1/2 transform -translate-x-1/2 -translate-y-full bg-gray-800 text-white text-xs rounded px-3 py-2 whitespace-nowrap z-30 shadow-lg">
                        <div className="mb-1">청약 {contractCount}건 중</div>
                        <div>거절: {rejectedCount}건, 철회: {withdrawnCount}건</div>
                        {/* 화살표 */}
                        <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-800"></div>
                      </div>
                    );
                  })()}
                  <div className="text-center">
                    <span className="text-xs text-black">전월 동기 대비 </span>
                    <span className="text-sm text-blue-600">▲ {getFilteredData('contractGrowth')}건</span>
                  </div>
                </div>
              </div>
            </div>

{/* 이번달 일별 실적 */}
            <div className="bg-white rounded-lg shadow-sm border p-4">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-semibold text-gray-700">{parseInt(appliedMonth.split('-')[1])}월 일별 실적</h3>

                {/* 지표 선택 토글 */}
                <div className="flex bg-gray-100 rounded-lg p-1">
                  {([performanceType, '청약', '설계'] as const).map(metric => (
                    <button
                      key={metric}
                      onClick={() => setDailyChartMetric(metric as any)}
                      className={`px-2 py-1 text-xs  rounded transition-colors ${
                        dailyChartMetric === metric
                          ? 'bg-white text-gray-900 shadow-sm'
                          : 'text-black hover:text-gray-900'
                      }`}
                    >
                      {metric}
                    </button>
                  ))}
                </div>
              </div>
              
              <div className="h-60 relative bg-gray-50 rounded-lg p-3" style={{overflow: 'visible'}} onMouseLeave={() => setHoveredDayData(null)}>
                {/* 평균값 레이블 - 차트 상단 */}
                {(() => {
                  const businessDayData = getDailyData().filter(d => !d.isWeekend);
                  const values = businessDayData.map(d => {
                    if (dailyChartMetric === 'APE' || dailyChartMetric === 'MMP') return d.apeAmount;
                    if (dailyChartMetric === '청약') return d.contractCount;
                    return d.proposalCount;
                  });
                  const average = values.reduce((sum, val) => sum + val, 0) / values.length;

                  return (
                    <div className="absolute top-2 right-2 text-xs  flex items-center gap-1 z-20 text-black">
                      <div className="w-4 h-0.5" style={{backgroundColor: '#facc15'}}></div>
                      <span>일 평균: {
                        dailyChartMetric === 'APE' ? `${Math.round(average * 1000000).toLocaleString()}원` :
                        dailyChartMetric === 'MMP' ? `${Math.round(average * 1000).toLocaleString()}원` :
                        `${average.toFixed(1)}건`
                      }</span>
                    </div>
                  );
                })()}

                {/* 평균선 */}
                {(() => {
                  const businessDayData = getDailyData().filter(d => !d.isWeekend);
                  const values = businessDayData.map(d => {
                    if (dailyChartMetric === 'APE' || dailyChartMetric === 'MMP') return d.apeAmount;
                    if (dailyChartMetric === '청약') return d.contractCount;
                    return d.proposalCount;
                  });
                  const average = values.reduce((sum, val) => sum + val, 0) / values.length;
                  const maxValue = Math.max(...values);
                  const avgY = maxValue === 0 ? 50 : 100 - ((average / maxValue) * 60);

                  return (
                    <svg className="absolute inset-0 w-full h-full" style={{zIndex: 10, pointerEvents: 'none'}}>
                      <line
                        x1="5%" y1={`${avgY}%`} x2="95%" y2={`${avgY}%`}
                        stroke="#facc15"
                        strokeWidth="2"
                        strokeDasharray="4,2"
                      />
                    </svg>
                  );
                })()}

                {/* 차트 영역 - 영업일만 표시 */}
                <div className="flex items-end justify-between h-full relative">
                  {/* 영업일만 표시 - 막대 그래프 */}
                  {getDailyData().filter(d => !d.isWeekend).map((data, index) => {
                    let value;
                    if (dailyChartMetric === 'APE' || dailyChartMetric === 'MMP') {
                      value = data.apeAmount;
                    } else if (dailyChartMetric === '청약') {
                      value = data.contractCount;
                    } else {
                      value = data.proposalCount;
                    }

                    // 최대값 계산
                    const businessDayData = getDailyData().filter(d => !d.isWeekend);
                    const maxValue = Math.max(...businessDayData.map(d => {
                      if (dailyChartMetric === 'APE' || dailyChartMetric === 'MMP') return d.apeAmount;
                      if (dailyChartMetric === '청약') return d.contractCount;
                      return d.proposalCount;
                    }));

                    const barHeight = maxValue === 0 ? 4 : Math.max(4, (value / maxValue) * 150);
                    const businessDayNumber = index + 1;

                    return (
                      <div key={data.day} className="flex flex-col items-center relative" style={{width: '20px'}}>
                        {/* 막대 - 누적 구조 */}
                        <div
                          className="w-4 rounded-t overflow-hidden hover:opacity-80 transition-opacity cursor-pointer flex flex-col"
                          style={{height: `${barHeight}px`}}
                          onMouseEnter={() => setHoveredDayData({...data, idx: index, businessDay: businessDayNumber, value})}
                        >
                          {/* 총 실적 (파란색으로만) */}
                          <div
                            className="w-full bg-blue-500 rounded"
                            style={{height: `${barHeight}px`}}
                          />
                        </div>

                        {/* 영업일자 */}
                        <div className="text-xs text-black mt-2" style={{fontSize: '10px'}}>{businessDayNumber}</div>
                      </div>
                    );
                  })}

                  {/* 툴팁 표시 */}
                  {hoveredDayData && (
                    <div
                      className="absolute bg-gray-800 text-white text-xs rounded px-2 py-1 whitespace-nowrap z-50 shadow-lg"
                      style={{
                        bottom: hoveredDayData.idx < 3 ? 'auto' : '100%',
                        top: hoveredDayData.idx < 3 ? '100%' : 'auto',
                        left: hoveredDayData.idx <= 2 ? '0' : hoveredDayData.idx >= 12 ? 'auto' : '50%',
                        right: hoveredDayData.idx >= 12 ? '0' : 'auto',
                        transform: hoveredDayData.idx > 2 && hoveredDayData.idx < 12 ? 'translateX(-50%)' : 'none',
                        marginBottom: hoveredDayData.idx >= 3 ? '8px' : '0',
                        marginTop: hoveredDayData.idx < 3 ? '8px' : '0'
                      }}
                    >
                      <div>9월 {hoveredDayData.day}일 (영업 {hoveredDayData.businessDay}일차) - {selectedProduct}</div>
                      {dailyChartMetric === 'APE' || dailyChartMetric === 'MMP' ? (
                        <div>{performanceType}: {Math.round(hoveredDayData.value * (performanceType === 'APE' ? 1000000 : 1000)).toLocaleString()}원</div>
                      ) : dailyChartMetric === '청약' ? (
                        <div>청약: {hoveredDayData.value}건</div>
                      ) : (
                        <div>설계: {hoveredDayData.value}건</div>
                      )}
                      <div className="absolute w-0 h-0"
                        style={{
                          borderLeft: '4px solid transparent',
                          borderRight: '4px solid transparent',
                          borderTop: hoveredDayData.idx < 3 ? 'none' : '4px solid #1f2937',
                          borderBottom: hoveredDayData.idx < 3 ? '4px solid #1f2937' : 'none',
                          left: hoveredDayData.idx <= 2 ? '12px' : hoveredDayData.idx >= 12 ? 'auto' : '50%',
                          right: hoveredDayData.idx >= 12 ? '12px' : 'auto',
                          top: hoveredDayData.idx < 3 ? '-4px' : 'auto',
                          bottom: hoveredDayData.idx < 3 ? 'auto' : '-4px',
                          transform: hoveredDayData.idx > 2 && hoveredDayData.idx < 12 ? 'translateX(-50%)' : 'none'
                        }}
                      />
                    </div>
                  )}
                </div>
              </div>

              {/* 가로축 레이블 */}
              <div className="flex justify-center mt-2">
                <span className="text-xs text-black">영업일차</span>
              </div>
            </div>


            {/* 상품 판매 현황 */}
            <div className="bg-white rounded-lg shadow-sm border p-4">
              <h3 className="text-sm font-semibold text-gray-700 mb-3">상품 판매 현황</h3>
              
              {/* 포트폴리오 분석 - 서브제목 제거 */}
              <div className="mb-4">
                <div className="space-y-2">
                  {getPortfolioData().map((item, idx) => {
                    // MMP 기준 데이터 (42.1백만원 총합)
                    const mmpTotal = 42.1; // 총 MMP (백만원)
                    const apeAmountRaw = mmpTotal * item.value / 100; // MMP 기준 계산

                    const formattedAmount = formatCurrency(apeAmountRaw * 10000, 'MMP');
                    
                    return (
                      <div
                        key={idx}
                        className="flex items-center gap-3 mb-1 group relative cursor-pointer"
                        onMouseEnter={() => setHoveredProduct({...item, idx})}
                        onMouseLeave={() => setHoveredProduct(null)}
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
                            />
                          )}
                        </div>
                        <span className="text-xs  text-gray-700 w-8 text-right flex-shrink-0">{item.value}%</span>

                        {/* 툴팁 */}
                        {hoveredProduct && hoveredProduct.idx === idx && (
                          <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-full bg-gray-800 text-white text-xs rounded px-2 py-1 whitespace-nowrap z-30 mb-2">
                            <div>{item.name}</div>
                            <div>{performanceType}: {item.amount.toLocaleString()}원</div>
                            <div>건수: {item.count}건</div>
                            <div>비중: {item.value.toFixed(1)}%</div>
                          </div>
                        )}
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
                        <span className="text-black">전체 평균 (건강 60% / 종신정기 40%)</span>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Top 3 상품 - 테이블 형태 */}
              <div className="border-t pt-3">
                <div className="flex items-center justify-between mb-3">
                  <div className="text-xs  text-gray-700">Top 3 상품</div>
                  <div className="text-xs text-gray-600">[단위: 백만원]</div>
                </div>

                <div className="overflow-hidden">
                  {/* 헤더 */}
                  <div className="grid gap-2 pb-2 border-b border-gray-200 mb-3" style={{gridTemplateColumns: '45px minmax(120px, 1fr) 100px 80px'}}>
                    <div className="text-xs  text-black text-center">순위</div>
                    <div className="text-xs  text-black">상품명</div>
                    <button
                      onClick={() => setProductSortBy(productSortBy === 'amount' ? 'count' : 'amount')}
                      className={`text-xs  hover:text-blue-600 transition-colors text-right flex items-center justify-end gap-1 ${
                        productSortBy === 'amount' ? 'text-blue-600 font-bold' : 'text-gray-900'
                      }`}
                    >
                      {performanceType}
                      {productSortBy === 'amount' && (
                        <ArrowDown className="w-3 h-3" />
                      )}
                    </button>
                    <button
                      onClick={() => setProductSortBy(productSortBy === 'count' ? 'amount' : 'count')}
                      className={`text-xs  hover:text-blue-600 transition-colors text-right flex items-center justify-end gap-1 ${
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
                        style={{gridTemplateColumns: '45px minmax(120px, 1fr) 100px 80px'}}
                      >
                        <div className="flex items-center justify-center">
                          <div className={`w-4 h-4 rounded-full flex items-center justify-center text-xs font-bold ${
                            idx < 3 ? 'bg-yellow-400 text-yellow-900' : 'bg-gray-200 text-black'
                          }`}>
                            {product.rank}
                          </div>
                        </div>
                        <div className="flex items-center min-w-0">
                          <div className="text-xs  text-gray-900 truncate">
                            {product.name}
                          </div>
                        </div>
                        <div className="flex items-center justify-end">
                          <div className={`text-xs ${
                            productSortBy === 'amount' ? 'text-blue-600 font-bold' : 'text-gray-900'
                          }`}>
                            {performanceType === 'MMP'
                              ? (parseFloat(product.amount) / 12).toFixed(1)
                              : product.amount
                            }
                          </div>
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
            {/* 당월 방문/교육 현황 */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-bold text-gray-900 flex items-center">
                  <Users className="w-5 h-5 text-blue-500 mr-2" />
                  당월 방문/교육 현황
                </h2>
              </div>

              {/* 방문/교육 토글 및 카운트 */}
              <div className="bg-white rounded-lg shadow-sm border p-4">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex gap-1">
                    {(['방문', '교육'] as const).map(type => (
                      <button
                        key={type}
                        onClick={() => {
                          setVisitEducationType(type);
                          setShowVisitEducationList(false);
                        }}
                        className={`px-4 py-2 rounded-lg text-sm  transition-all ${
                          visitEducationType === type
                            ? 'bg-blue-50 text-blue-600 border border-blue-200'
                            : 'text-black hover:bg-gray-50'
                        }`}
                      >
                        {type}
                      </button>
                    ))}
                  </div>

                  <div className="text-right">
                    <div className="text-2xl font-bold text-blue-600">
                      {visitEducationData[visitEducationType].count}건
                    </div>
                    <div className="text-xs text-black">이번 달 총 {visitEducationType}</div>
                  </div>
                </div>

                {/* 세부 리스트 - 항상 펼쳐진 상태 */}
                <div className="border-t pt-3 mt-3">
                  <div className="text-xs text-black mb-3">
                    {visitEducationType} 상세 내역
                  </div>

                  <div className="max-h-48 overflow-y-auto">
                    {/* 컬럼 헤더 */}
                    <div className="flex items-center gap-3 p-2 bg-gray-50 rounded-lg mb-2 text-xs  text-gray-700 border-b border-gray-200">
                      <div className="min-w-[35px] shrink-0">날짜</div>
                      <div className="min-w-[120px] shrink-0">대리점</div>
                      <div className="min-w-[120px] shrink-0">지점</div>
                      <div className="flex-1 min-w-0">활동 내용</div>
                    </div>

                    <div className="space-y-1">
                      {visitEducationData[visitEducationType].data.map((item, index) => (
                        <div
                          key={index}
                          className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-50 text-xs border-l-2 border-transparent hover:border-blue-200 transition-all"
                        >
                          <div className="text-black min-w-[35px] shrink-0 font-mono">
                            {item.date}
                          </div>
                          <div className="min-w-[120px] shrink-0 truncate text-gray-900">
                            {item.agency}
                          </div>
                          <div className="min-w-[120px] shrink-0 truncate text-gray-700">
                            {item.branch}
                          </div>
                          <div className="text-black flex-1 min-w-0 truncate">
                            {item.detail}
                          </div>
                        </div>
                      ))}
                    </div>
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
                  className="text-xs text-black hover:text-gray-800 hover:bg-gray-100 rounded transition-colors flex items-center gap-1 px-2 py-1"
                >
                  <span>전체 보기</span>
                  <ChevronRight className="w-3 h-3" />
                </button>
              </div>
              <div className="flex items-center justify-center gap-8">
                <div className="text-center">
                  <span className="text-sm text-black mr-2">전체</span>
                  <span className="text-xl font-bold text-gray-900">160개</span>
                </div>
                <div className="h-6 w-px bg-gray-200"></div>
                <div className="text-center">
                  <span className="text-sm text-black mr-2">가동</span>
                  <span className="text-xl font-bold text-blue-600">95개</span>
                  <span className="text-sm font-normal text-black ml-1">(59.4%)</span>
                </div>
              </div>
            </div>

            {/* 지점별 상세 바로가기 및 다운로드 버튼 */}
            <div className="mt-3 flex gap-2">
              <button
                onClick={handleBranchDetailClick}
                className="w-full bg-gradient-to-r from-blue-500 to-blue-600 text-white px-4 py-3 rounded text-sm  hover:shadow-lg transition-all flex items-center justify-center gap-2"
              >
                <Building className="w-4 h-4" />
                지점별 상세 바로가기
              </button>
            </div>
            

            {/* 방문 추천 지점 */}
            <div className="bg-white rounded-lg shadow-sm border p-4">
              <div className="flex items-center gap-2 mb-3 relative">
                <h3 className="text-sm font-semibold text-gray-700">오늘 주목할 지점</h3>
                <button
                  className="ml-auto p-1 text-gray-400 hover:text-black relative"
                  onClick={() => setShowCriteriaTooltip(!showCriteriaTooltip)}
                >
                  <HelpCircle className="w-4 h-4" />
                </button>

                {/* 산출 기준 툴팁 */}
                {showCriteriaTooltip && (
                  <div className="fixed inset-0 z-10" onClick={() => setShowCriteriaTooltip(false)}></div>
                )}
                {showCriteriaTooltip && (
                  <div
                    className="absolute top-8 right-0 bg-gray-800 text-white text-sm rounded-lg p-6 z-20 shadow-lg overflow-y-auto select-none"
                    style={{
                      width: `${modalSize.width}px`,
                      height: `${modalSize.height}px`,
                      minWidth: '300px',
                      minHeight: '200px'
                    }}
                  >
                    {/* Resize handles */}
                    <div
                      className="absolute top-0 right-0 w-4 h-4 cursor-se-resize opacity-50 hover:opacity-100"
                      onMouseDown={(e) => handleResizeStart(e, 'se')}
                      style={{ background: 'linear-gradient(-45deg, transparent 40%, white 40%, white 60%, transparent 60%)' }}
                    ></div>
                    <div
                      className="absolute top-0 right-2 left-2 h-1 cursor-n-resize opacity-0 hover:opacity-50 hover:bg-gray-600"
                      onMouseDown={(e) => handleResizeStart(e, 'n')}
                    ></div>
                    <div
                      className="absolute bottom-0 right-2 left-2 h-1 cursor-s-resize opacity-0 hover:opacity-50 hover:bg-gray-600"
                      onMouseDown={(e) => handleResizeStart(e, 's')}
                    ></div>
                    <div
                      className="absolute top-2 bottom-2 left-0 w-1 cursor-w-resize opacity-0 hover:opacity-50 hover:bg-gray-600"
                      onMouseDown={(e) => handleResizeStart(e, 'w')}
                    ></div>
                    <div
                      className="absolute top-2 bottom-2 right-0 w-1 cursor-e-resize opacity-0 hover:opacity-50 hover:bg-gray-600"
                      onMouseDown={(e) => handleResizeStart(e, 'e')}
                    ></div>

                    <div className="text-center font-semibold mb-3">오늘 주목할 지점 산출 기준</div>

                    <div className="mb-2 font-semibold text-red-300">위험</div>
                    <div className="space-y-2 mb-4 text-sm">
                      <div>• <strong>실적 급하락:</strong> 전월 동기 대비 APE -30% 이상</div>
                      <div>• <strong>진도율 저조:</strong> 현재 목표 달성률 → 업권 중 기대 진도율 -20%p</div>
                      <div>• <strong>핵심설계사 해촉:</strong> 지점 3개월 평균 APE 상위 20%에 해당했던 설계사가 최근 3영업일 내에 해촉한 경우</div>
                      <div>• <strong>핵심설계사 미가동:</strong> 지점 3개월 평균 APE 상위 20%에 해당하는 설계사가 당월 활동을 멈춘 경우</div>
                      <div>• <strong>계약 품질 이슈:</strong> 최근 3영업일 청약철회 또는 청약불완료가 2건 이상 발생한 경우</div>
                      <div>• <strong>신입 이상 계약:</strong> 설계사 처음 청약 상품이 종신/정기보험인 경우 (건강보험 아님)</div>
                      <div>• <strong>장기 미관리:</strong> 타깃은 있지만 6개월 이상 방문/교육 없고 실적도 없는 지점</div>
                    </div>

                    <div className="mb-2 font-semibold text-green-300">기회</div>
                    <div className="space-y-2 mb-4 text-sm">
                      <div>• <strong>실적 급상승:</strong> 전월 동기 대비 APE +30% 이상</div>
                      <div>• <strong>진도율 우수:</strong> 현재 목표 달성률 → 업권 중 기대 진도율 +20%p</div>
                      <div>• <strong>고객계좌 체결:</strong> 보장 보험료 30만 원 이상 계약 체결</div>
                      <div>• <strong>생애 첫 계약:</strong> 위촉 설계사가 당월 내 첫 계약 성공</div>
                    </div>

                    <div className="mb-2 font-semibold text-blue-300">변화</div>
                    <div className="space-y-2 mb-3 text-sm">
                      <div>• <strong>신규 설계사 유입:</strong> 당월 신규 위촉 인원 1명 이상 발생</div>
                      <div>• <strong>포트폴리오 급변화:</strong> '건강' vs '종신/정기' 보험 기준 직전 3개월 평균 대비 당월 ±20% 이상 변동</div>
                    </div>

                    <div className="absolute -top-2 right-4 w-0 h-0 border-l-4 border-r-4 border-b-4 border-l-transparent border-r-transparent border-b-gray-800"></div>
                  </div>
                )}
              </div>

              <div className="space-y-3">
                {/* 확장되지 않았을 때는 8개, 확장했을 때는 전체 표시 */}
                {managementFocus
                  .slice(0, expandedRecommendations ? undefined : 8)
                  .map((item) => (
                    <div
                      key={item.id}
                      className="p-3 bg-white border border-gray-100 cursor-pointer hover:shadow-sm hover:border-gray-200 transition-all"
                      onClick={() => handleVisitBranchClick(item.agency, item.branch)}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <span className={`inline-flex items-center px-2 py-1 rounded text-xs  ${
                            item.type === 'risk'
                              ? 'bg-red-100 text-red-800'
                              : item.type === 'opportunity'
                              ? 'bg-green-100 text-green-800'
                              : 'bg-blue-100 text-blue-800'
                          }`}>
                            {item.type === 'risk' ? '위험' : item.type === 'opportunity' ? '기회' : '변화'}
                          </span>
                          <div className="flex-1">
                            <div className="text-sm font-semibold text-gray-900">
                              {item.agency} {'>'} {item.branch}
                            </div>
                            <div className="text-sm text-black">
                              {item.issue}
                            </div>
                          </div>
                        </div>
                        <ChevronRight className="w-4 h-4 text-gray-400" />
                      </div>
                    </div>
                  ))}
              </div>

              {/* 더보기 버튼 */}
              {managementFocus.length > 8 && (
                <div className="mt-3 text-center">
                  <button
                    onClick={() => setExpandedRecommendations(!expandedRecommendations)}
                    className="text-blue-600 hover:text-blue-700 text-sm  flex items-center justify-center gap-1 mx-auto"
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
                <h3 className="text-sm font-semibold text-gray-700">지점 순위 TOP 5</h3>
                <div className="flex bg-gray-100 rounded-lg p-1">
                  <button
                    onClick={() => setBranchPeriod('current')}
                    className={`px-3 py-1 text-xs  rounded transition-colors ${
                      branchPeriod === 'current'
                        ? 'bg-white text-gray-900 shadow-sm'
                        : 'text-black hover:text-gray-900'
                    }`}
                  >
                    당월
                  </button>
                  <button
                    onClick={() => setBranchPeriod('previous')}
                    className={`px-3 py-1 text-xs  rounded transition-colors ${
                      branchPeriod === 'previous'
                        ? 'bg-white text-gray-900 shadow-sm'
                        : 'text-black hover:text-gray-900'
                    }`}
                  >
                    전월
                  </button>
                </div>
              </div>

              {/* 단위 표시 */}
              <div className="mb-2 text-right">
                <span className="text-xs text-gray-600">[단위: 백만원]</span>
              </div>

              {/* 테이블 형태 */}
              <div className="overflow-hidden">
                {/* 헤더 */}
                <div className="grid gap-3 pb-3 border-b border-gray-200 mb-2" style={{gridTemplateColumns: '50px 1fr 100px 110px'}}>
                  <div className="text-xs font-semibold text-gray-700 text-center">순위</div>
                  <div className="text-xs font-semibold text-gray-700">지점명</div>
                  <button
                    onClick={() => {
                      if (branchSortBy === 'ape') {
                        setBranchSortOrder(branchSortOrder === 'desc' ? 'asc' : 'desc');
                      } else {
                        setBranchSortBy('ape');
                        setBranchSortOrder('desc');
                      }
                    }}
                    className={`text-xs font-semibold hover:text-blue-600 transition-colors text-right flex items-center justify-end gap-1 ${
                      branchSortBy === 'ape' ? 'text-blue-600' : 'text-gray-700'
                    }`}
                  >
                    {performanceType}
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
                    className={`text-xs font-semibold hover:text-blue-600 transition-colors text-right flex items-center justify-end gap-1 ${
                      branchSortBy === 'achievement' ? 'text-blue-600' : 'text-gray-700'
                    }`}
                  >
                    목표달성률
                    {branchSortBy === 'achievement' && (
                      branchSortOrder === 'desc' ? <ArrowDown className="w-3 h-3" /> : <ArrowUp className="w-3 h-3" />
                    )}
                  </button>
                </div>

                {/* 데이터 행 */}
                <div className="space-y-0.5">
                  {getBranchRankings(false, performanceType).data.map((branch, idx) => (
                    <div
                      key={idx}
                      className="grid gap-3 py-2.5 px-2 hover:bg-blue-50 rounded cursor-pointer transition-all"
                      style={{gridTemplateColumns: '50px 1fr 100px 110px'}}
                      onClick={() => handleBranchClick(branch.agency, branch.branch)}
                    >
                      <div className="flex items-center justify-center">
                        <div className="text-sm font-bold text-gray-900">
                          {idx + 1}
                        </div>
                      </div>
                      <div className="flex flex-col justify-center min-w-0">
                        <div className="text-xs text-gray-600 leading-tight">{branch.agency}</div>
                        <div className="text-sm font-medium text-gray-900 leading-tight">{branch.branch}</div>
                      </div>
                      <div className="flex items-center justify-end relative group">
                        <div className={`text-sm font-medium ${
                          branchSortBy === 'ape' ? 'text-blue-600' : 'text-gray-900'
                        }`}>{performanceType === 'MMP' ? `${(branch.ape / 1000000).toFixed(1)}` : `${Math.round(branch.ape / 1000000).toLocaleString()}`}</div>
                        <div className="absolute bottom-full right-0 mb-2 hidden group-hover:block bg-gray-800 text-white text-xs py-1 px-2 rounded whitespace-nowrap z-10">
                          {branch.ape.toLocaleString()}원
                        </div>
                      </div>
                      <div className="flex items-center justify-end">
                        <div className={`text-sm font-medium ${
                          branchSortBy === 'achievement' ? 'text-blue-600' : 'text-gray-900'
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
                  className="w-full text-center text-xs text-blue-600 hover:text-blue-800  transition-colors"
                >
                  더보기 (전체 순위 보기)
                </button>
              </div>

            </div>

            <div className="text-xs text-black text-center p-2 bg-gray-50 rounded">
              지점 클릭 시 해당 지점의 상세 분석 화면으로 이동합니다
            </div>

          </div>
        </div>

      </div>

      {/* 전체 지점 목록 모달 */}
      {showAllBranchesModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50" onClick={() => setShowAllBranchesModal(false)}>
          <div className="bg-white rounded-lg p-6 max-w-6xl w-full mx-4 max-h-[80vh] flex flex-col" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-lg font-semibold text-gray-900">
                전체 지점 순위
              </h3>
              <button
                onClick={() => setShowAllBranchesModal(false)}
                className="text-gray-500 hover:text-gray-700 text-xl"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* KPI 선택 라디오 버튼 */}
            <div className="mb-4">
              <div className="flex items-center gap-6">
                <span className="text-sm font-medium text-gray-700">실적 기준:</span>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    checked={modalKPI === 'APE'}
                    onChange={() => setModalKPI('APE')}
                    className="w-4 h-4 text-blue-600"
                  />
                  <span className="text-sm text-gray-700">APE</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    checked={modalKPI === 'MMP'}
                    onChange={() => setModalKPI('MMP')}
                    className="w-4 h-4 text-blue-600"
                  />
                  <span className="text-sm text-gray-700">MMP</span>
                </label>
              </div>
            </div>

            <div className="flex-1 overflow-auto">
              <div className="mb-2 text-right">
                <span className="text-sm text-black">[단위: 원]</span>
              </div>
              <div className="overflow-x-auto max-h-[400px] overflow-y-auto">
                <table className="w-full">
                  <thead className="sticky top-0 z-10 bg-white">
                    {/* 첫 번째 헤더 행 - 그룹 헤더 */}
                    <tr className="border-b border-gray-200">
                      <th rowSpan={2} className="text-center py-3 px-2 bg-gray-50 text-xs font-semibold text-gray-800 border-r border-gray-200 cursor-pointer hover:bg-gray-100"
                          onClick={() => {
                            if (modalSortBy === 'no') {
                              setModalSortOrder(modalSortOrder === 'asc' ? 'desc' : 'asc');
                            } else {
                              setModalSortBy('no');
                              setModalSortOrder('asc');
                            }
                          }}>
                        <div className="flex items-center justify-center gap-1">
                          번호
                          {modalSortBy === 'no' && (
                            modalSortOrder === 'asc' ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />
                          )}
                        </div>
                      </th>
                      <th rowSpan={2} className="text-left py-3 px-3 bg-gray-50 text-xs font-semibold text-gray-800 border-r border-gray-200 cursor-pointer hover:bg-gray-100"
                          onClick={() => {
                            if (modalSortBy === 'agency') {
                              setModalSortOrder(modalSortOrder === 'asc' ? 'desc' : 'asc');
                            } else {
                              setModalSortBy('agency');
                              setModalSortOrder('asc');
                            }
                          }}>
                        <div className="flex items-center gap-1">
                          대리점명
                          {modalSortBy === 'agency' && (
                            modalSortOrder === 'asc' ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />
                          )}
                        </div>
                      </th>
                      <th rowSpan={2} className="text-left py-3 px-3 bg-gray-50 text-xs font-semibold text-gray-800 border-r border-gray-200 cursor-pointer hover:bg-gray-100"
                          onClick={() => {
                            if (modalSortBy === 'branch') {
                              setModalSortOrder(modalSortOrder === 'asc' ? 'desc' : 'asc');
                            } else {
                              setModalSortBy('branch');
                              setModalSortOrder('asc');
                            }
                          }}>
                        <div className="flex items-center gap-1">
                          지점명
                          {modalSortBy === 'branch' && (
                            modalSortOrder === 'asc' ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />
                          )}
                        </div>
                      </th>
                      <th colSpan={2} className="text-center py-2 px-2 bg-gray-50 text-xs font-semibold text-gray-800 border-r border-gray-200">
                        실적({modalKPI})
                      </th>
                      <th colSpan={2} className="text-center py-2 px-2 bg-gray-50 text-xs font-semibold text-gray-800 border-r border-gray-200">
                        당월 목표관리
                      </th>
                      <th colSpan={2} className="text-center py-2 px-2 bg-gray-50 text-xs font-semibold text-gray-800">
                        나의 성과 기여도
                      </th>
                    </tr>
                    {/* 두 번째 헤더 행 - 세부 컬럼 */}
                    <tr className="border-b border-gray-200">
                      <th className="text-center py-2 px-2 bg-gray-50 text-xs font-semibold text-gray-800 border-r border-gray-200 cursor-pointer hover:bg-gray-100"
                          onClick={() => {
                            if (modalSortBy === 'currentMonth') {
                              setModalSortOrder(modalSortOrder === 'asc' ? 'desc' : 'asc');
                            } else {
                              setModalSortBy('currentMonth');
                              setModalSortOrder('desc');
                            }
                          }}>
                        <div className="flex items-center justify-center gap-1">
                          당월
                          {modalSortBy === 'currentMonth' && (
                            modalSortOrder === 'asc' ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />
                          )}
                        </div>
                      </th>
                      <th className="text-center py-2 px-2 bg-gray-50 text-xs font-semibold text-gray-800 border-r border-gray-200 cursor-pointer hover:bg-gray-100"
                          onClick={() => {
                            if (modalSortBy === 'previousMonth') {
                              setModalSortOrder(modalSortOrder === 'asc' ? 'desc' : 'asc');
                            } else {
                              setModalSortBy('previousMonth');
                              setModalSortOrder('desc');
                            }
                          }}>
                        <div className="flex items-center justify-center gap-1">
                          전월
                          {modalSortBy === 'previousMonth' && (
                            modalSortOrder === 'asc' ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />
                          )}
                        </div>
                      </th>
                      <th className="text-center py-2 px-2 bg-gray-50 text-xs font-semibold text-gray-800 border-r border-gray-200 cursor-pointer hover:bg-gray-100"
                          onClick={() => {
                            if (modalSortBy === 'target') {
                              setModalSortOrder(modalSortOrder === 'asc' ? 'desc' : 'asc');
                            } else {
                              setModalSortBy('target');
                              setModalSortOrder('desc');
                            }
                          }}>
                        <div className="flex items-center justify-center gap-1">
                          목표
                          {modalSortBy === 'target' && (
                            modalSortOrder === 'asc' ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />
                          )}
                        </div>
                      </th>
                      <th className="text-center py-2 px-2 bg-gray-50 text-xs font-semibold text-gray-800 border-r border-gray-200 cursor-pointer hover:bg-gray-100"
                          onClick={() => {
                            if (modalSortBy === 'achievement') {
                              setModalSortOrder(modalSortOrder === 'asc' ? 'desc' : 'asc');
                            } else {
                              setModalSortBy('achievement');
                              setModalSortOrder('desc');
                            }
                          }}>
                        <div className="flex items-center justify-center gap-1">
                          달성률
                          {modalSortBy === 'achievement' && (
                            modalSortOrder === 'asc' ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />
                          )}
                        </div>
                      </th>
                      <th className="text-center py-2 px-2 bg-gray-50 text-xs font-semibold text-gray-800 border-r border-gray-200 cursor-pointer hover:bg-gray-100"
                          onClick={() => {
                            if (modalSortBy === 'targetContribution') {
                              setModalSortOrder(modalSortOrder === 'asc' ? 'desc' : 'asc');
                            } else {
                              setModalSortBy('targetContribution');
                              setModalSortOrder('desc');
                            }
                          }}>
                        <div className="flex items-center justify-center gap-1">
                          목표담당
                          {modalSortBy === 'targetContribution' && (
                            modalSortOrder === 'asc' ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />
                          )}
                        </div>
                      </th>
                      <th className="text-center py-2 px-2 bg-gray-50 text-xs font-semibold text-gray-800 cursor-pointer hover:bg-gray-100"
                          onClick={() => {
                            if (modalSortBy === 'performanceContribution') {
                              setModalSortOrder(modalSortOrder === 'asc' ? 'desc' : 'asc');
                            } else {
                              setModalSortBy('performanceContribution');
                              setModalSortOrder('desc');
                            }
                          }}>
                        <div className="flex items-center justify-center gap-1">
                          실적담당
                          {modalSortBy === 'performanceContribution' && (
                            modalSortOrder === 'asc' ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />
                          )}
                        </div>
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {(() => {
                      const data = getBranchInfoData();

                      // 목표 및 기여도 계산
                      const totalTarget = data.reduce((sum, b) => sum + (b.target || 0), 0);
                      const totalPerformance = data.reduce((sum, b) => sum + b.currentMonthAPE, 0);

                      const enrichedData = data.map((branch, idx) => {
                        const branchHash = (branch.branch || '').split('').reduce((acc, char) => acc + char.charCodeAt(0), idx);

                        // 30개 정도의 지점은 목표가 0 (전월 실적도 없음)
                        const hasTarget = idx >= 30; // 처음 30개는 목표 0

                        // 전월 실적 먼저 계산 (목표가 있는 지점만)
                        let previousMonth = 0;
                        if (hasTarget) {
                          const randomFactor1 = (branchHash % 100) / 100;
                          const randomFactor2 = ((branchHash + idx) % 100) / 100;
                          const position = idx - 30; // 0~129

                          // 전월 실적은 목표와 비슷한 패턴으로 생성
                          if (position < 10) {
                            previousMonth = 8000000 + Math.floor(17000000 * randomFactor1);
                          } else if (position < 30) {
                            previousMonth = 4000000 + Math.floor(4000000 * randomFactor1);
                          } else if (position < 60) {
                            previousMonth = 1500000 + Math.floor(2500000 * randomFactor1);
                          } else {
                            previousMonth = 300000 + Math.floor(1200000 * randomFactor1);
                          }
                          previousMonth = Math.round(previousMonth / 100000) * 100000;
                        }

                        // 목표: 전월 실적을 기반으로 설정 (전월의 80~120%)
                        let target = 0;
                        if (hasTarget && previousMonth > 0) {
                          const targetRatio = 0.8 + ((branchHash % 40) / 100); // 0.8 ~ 1.2
                          target = Math.round((previousMonth * targetRatio) / 100000) * 100000;
                        }

                        // 달성률 = (실적 / 목표) * 100
                        const achievement = target > 0 ? (branch.currentMonthAPE / target) * 100 : 0;

                        return {
                          ...branch,
                          target,
                          previousMonth,
                          achievement
                        };
                      });

                      // 전체 목표 및 실적 합계
                      const totalTargetFinal = enrichedData.reduce((sum, b) => sum + b.target, 0);
                      const totalPerformanceFinal = enrichedData.reduce((sum, b) => sum + b.currentMonthAPE, 0);

                      // 목표담당률 및 실적담당률 계산
                      const finalData = enrichedData.map(branch => {
                        const targetContribution = totalTargetFinal > 0
                          ? (branch.target / totalTargetFinal) * 100
                          : 0;
                        const performanceContribution = totalPerformanceFinal > 0
                          ? (branch.currentMonthAPE / totalPerformanceFinal) * 100
                          : 0;

                        return {
                          ...branch,
                          targetContribution,
                          performanceContribution
                        };
                      });

                      const sortedData = [...finalData].sort((a, b) => {
                        let aVal, bVal;

                        switch(modalSortBy) {
                          case 'no':
                            aVal = a.no;
                            bVal = b.no;
                            break;
                          case 'agency':
                            aVal = a.agency;
                            bVal = b.agency;
                            break;
                          case 'branch':
                            aVal = a.branch;
                            bVal = b.branch;
                            break;
                          case 'currentMonth':
                            aVal = a.currentMonthAPE;
                            bVal = b.currentMonthAPE;
                            break;
                          case 'previousMonth':
                            aVal = a.previousMonth;
                            bVal = b.previousMonth;
                            break;
                          case 'target':
                            aVal = a.target;
                            bVal = b.target;
                            break;
                          case 'achievement':
                            aVal = a.achievement;
                            bVal = b.achievement;
                            break;
                          case 'targetContribution':
                            aVal = a.targetContribution;
                            bVal = b.targetContribution;
                            break;
                          case 'performanceContribution':
                            aVal = a.performanceContribution;
                            bVal = b.performanceContribution;
                            break;
                          default:
                            aVal = a.no;
                            bVal = b.no;
                            break;
                        }

                        if (typeof aVal === 'string' && typeof bVal === 'string') {
                          return modalSortOrder === 'asc' ? aVal.localeCompare(bVal) : bVal.localeCompare(aVal);
                        }
                        return modalSortOrder === 'asc' ? aVal - bVal : bVal - aVal;
                      });

                      return sortedData.map((branch, idx) => (
                        <tr key={idx}
                          className="border-b border-gray-100 hover:bg-blue-50 cursor-pointer transition-colors"
                          onClick={() => {
                            const queryParams = new URLSearchParams({
                              period: appliedMonth,
                              year: selectedYear,
                              kpi: selectedKPI,
                              product: selectedProduct
                            });
                            navigate(`/branch/${encodeURIComponent(branch.agency)}/${encodeURIComponent(branch.branch)}?${queryParams.toString()}`);
                          }}>
                        {/* 번호 */}
                        <td className="py-3 px-2 text-center border-r border-gray-200 text-xs text-gray-900">
                          {idx + 1}
                        </td>
                        <td className="py-3 px-3 border-r border-gray-200 text-xs text-black">
                          {branch.agency}
                        </td>
                        <td className="py-3 px-3 border-r border-gray-200 text-xs text-black">
                          {branch.branch}
                        </td>

                        {/* 실적 - 당월 */}
                        <td className="py-3 px-2 text-center border-r border-gray-200 text-xs text-black">
                          {branch.currentMonthAPE > 0
                            ? `${(modalKPI === 'MMP' ? Math.round(branch.currentMonthAPE / 12) : branch.currentMonthAPE).toLocaleString()}`
                            : '-'}
                        </td>
                        {/* 실적 - 전월 */}
                        <td className="py-3 px-2 text-center border-r border-gray-200 text-xs text-gray-600">
                          {branch.previousMonth > 0
                            ? `${(modalKPI === 'MMP' ? Math.round(branch.previousMonth / 12) : branch.previousMonth).toLocaleString()}`
                            : '-'}
                        </td>

                        {/* 당월 목표관리 - 목표 */}
                        <td className="py-3 px-2 text-center border-r border-gray-200 text-xs text-black">
                          {branch.target > 0 ? (modalKPI === 'MMP' ? Math.round(branch.target / 12) : branch.target).toLocaleString() : '-'}
                        </td>
                        {/* 당월 목표관리 - 달성률 */}
                        <td className="py-3 px-2 text-center border-r border-gray-200 text-xs text-black">
                          {branch.target > 0 && branch.achievement > 0 ? `${branch.achievement.toFixed(1)}%` : '-'}
                        </td>

                        {/* 나의 성과 기여도 - 목표담당 */}
                        <td className="py-3 px-2 text-center border-r border-gray-200 text-xs text-black">
                          {branch.target > 0 ? `${branch.targetContribution.toFixed(1)}%` : '-'}
                        </td>
                        {/* 나의 성과 기여도 - 실적담당 */}
                        <td className="py-3 px-2 text-center text-xs text-black">
                          {branch.performanceContribution > 0 ? `${branch.performanceContribution.toFixed(1)}%` : '-'}
                        </td>
                      </tr>
                    ));
                    })()}
                  </tbody>
                </table>
              </div>
            </div>

          </div>
        </div>
      )}

      {/* 지점 기본정보 모달 */}
      {showBranchInfoModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50" onClick={() => setBranchInfoModal(false)}>
          <div className="bg-white rounded-lg p-6 max-w-7xl w-full mx-4 max-h-[90vh] flex flex-col" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-lg font-semibold text-gray-900">전체 관리 지점 목록</h3>
              <button
                onClick={() => setBranchInfoModal(false)}
                className="text-gray-400 hover:text-black transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>



            {/* KPI 선택 라디오 버튼 */}
            <div className="mb-4">
              <div className="flex items-center gap-6">
                <span className="text-sm  text-gray-700">실적 기준:</span>
                <div className="flex items-center gap-4">
                  <label className="flex items-center cursor-pointer">
                    <input
                      type="radio"
                      name="modalKPI"
                      value="APE"
                      checked={modalKPI === 'APE'}
                      onChange={(e) => setModalKPI(e.target.value as 'APE' | 'MMP')}
                      className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 focus:ring-2"
                    />
                    <span className="ml-2 text-sm text-gray-700">APE</span>
                  </label>
                  <label className="flex items-center cursor-pointer">
                    <input
                      type="radio"
                      name="modalKPI"
                      value="MMP"
                      checked={modalKPI === 'MMP'}
                      onChange={(e) => setModalKPI(e.target.value as 'APE' | 'MMP')}
                      className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 focus:ring-2"
                    />
                    <span className="ml-2 text-sm text-gray-700">MMP</span>
                  </label>
                </div>
              </div>
            </div>

            <div className="flex-1 overflow-auto">
              <div className="mb-2 text-right">
                <span className="text-sm text-black">[단위: 원]</span>
              </div>
              <div className="overflow-x-auto max-h-[400px] overflow-y-auto">
                <table className="w-full">
                  <thead className="sticky top-0 z-10 bg-white">
                    <tr className="border-b border-gray-200">
                      {/* 번호 */}
                      <th className="text-center py-3 px-2 bg-gray-50 text-xs font-semibold text-gray-800 border-r border-gray-200 cursor-pointer hover:bg-gray-100"
                          onClick={() => {
                            if (branchInfoSortBy === 'no') {
                              setBranchInfoSortOrder(branchInfoSortOrder === 'asc' ? 'desc' : 'asc');
                            } else {
                              setBranchInfoSortBy('no');
                              setBranchInfoSortOrder('asc');
                            }
                          }}>
                        <div className="flex items-center justify-center gap-1">
                          번호
                          {branchInfoSortBy === 'no' && (
                            branchInfoSortOrder === 'asc' ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />
                          )}
                        </div>
                      </th>
                      <th className="text-left py-3 px-3 bg-gray-50 text-xs font-semibold text-gray-800 border-r border-gray-200 cursor-pointer hover:bg-gray-100"
                          onClick={() => {
                            if (branchInfoSortBy === 'agency') {
                              setBranchInfoSortOrder(branchInfoSortOrder === 'asc' ? 'desc' : 'asc');
                            } else {
                              setBranchInfoSortBy('agency');
                              setBranchInfoSortOrder('asc');
                            }
                          }}>
                        <div className="flex items-center gap-1">
                          대리점명
                          {branchInfoSortBy === 'agency' && (
                            branchInfoSortOrder === 'asc' ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />
                          )}
                        </div>
                      </th>
                      <th className="text-left py-3 px-3 bg-gray-50 text-xs font-semibold text-gray-800 border-r border-gray-200 cursor-pointer hover:bg-gray-100"
                          onClick={() => {
                            if (branchInfoSortBy === 'branch') {
                              setBranchInfoSortOrder(branchInfoSortOrder === 'asc' ? 'desc' : 'asc');
                            } else {
                              setBranchInfoSortBy('branch');
                              setBranchInfoSortOrder('asc');
                            }
                          }}>
                        <div className="flex items-center gap-1">
                          지점명
                          {branchInfoSortBy === 'branch' && (
                            branchInfoSortOrder === 'asc' ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />
                          )}
                        </div>
                      </th>

                      {/* 기본 정보 */}
                      <th className="text-left py-3 px-3 bg-gray-50 text-xs font-semibold text-gray-800 border-r border-gray-200 cursor-pointer hover:bg-gray-100"
                          onClick={() => {
                            if (branchInfoSortBy === 'partnershipDate') {
                              setBranchInfoSortOrder(branchInfoSortOrder === 'asc' ? 'desc' : 'asc');
                            } else {
                              setBranchInfoSortBy('partnershipDate');
                              setBranchInfoSortOrder('asc');
                            }
                          }}>
                        <div className="flex items-center gap-1">
                          지점 개설일자
                          {branchInfoSortBy === 'partnershipDate' && (
                            branchInfoSortOrder === 'asc' ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />
                          )}
                        </div>
                      </th>

                      {/* 지점 실적 */}
                      <th className="text-center py-3 px-2 bg-gray-50 text-xs font-semibold text-gray-800 border-r border-gray-200 cursor-pointer hover:bg-gray-100"
                          onClick={() => {
                            if (branchInfoSortBy === 'currentMonthAPE') {
                              setBranchInfoSortOrder(branchInfoSortOrder === 'asc' ? 'desc' : 'asc');
                            } else {
                              setBranchInfoSortBy('currentMonthAPE');
                              setBranchInfoSortOrder('desc');
                            }
                          }}>
                        <div className="flex items-center justify-center gap-1">
                          당월 {modalKPI}
                          {branchInfoSortBy === 'currentMonthAPE' && (
                            branchInfoSortOrder === 'asc' ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />
                          )}
                        </div>
                      </th>

                      {/* 설계사 위촉 - 순서 변경: 가동설계사를 먼저 */}
                      <th className="text-center py-3 px-2 bg-gray-50 text-xs font-semibold text-gray-800 border-r border-gray-200 cursor-pointer hover:bg-gray-100"
                          onClick={() => {
                            if (branchInfoSortBy === 'activeAgents') {
                              setBranchInfoSortOrder(branchInfoSortOrder === 'asc' ? 'desc' : 'asc');
                            } else {
                              setBranchInfoSortBy('activeAgents');
                              setBranchInfoSortOrder('desc');
                            }
                          }}>
                        <div className="flex items-center justify-center gap-1">
                          가동설계사수
                          {branchInfoSortBy === 'activeAgents' && (
                            branchInfoSortOrder === 'asc' ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />
                          )}
                        </div>
                      </th>
                      <th className="text-center py-3 px-2 bg-gray-50 text-xs font-semibold text-gray-800 border-r border-gray-200 cursor-pointer hover:bg-gray-100"
                          onClick={() => {
                            if (branchInfoSortBy === 'totalAgents') {
                              setBranchInfoSortOrder(branchInfoSortOrder === 'asc' ? 'desc' : 'asc');
                            } else {
                              setBranchInfoSortBy('totalAgents');
                              setBranchInfoSortOrder('desc');
                            }
                          }}>
                        <div className="flex items-center justify-center gap-1">
                          위촉설계사수
                          {branchInfoSortBy === 'totalAgents' && (
                            branchInfoSortOrder === 'asc' ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />
                          )}
                        </div>
                      </th>
                      {/* 주소를 마지막으로 이동 */}
                      <th className="text-left py-3 px-3 bg-gray-50 text-xs font-semibold text-gray-800 cursor-pointer hover:bg-gray-100"
                          onClick={() => {
                            if (branchInfoSortBy === 'address') {
                              setBranchInfoSortOrder(branchInfoSortOrder === 'asc' ? 'desc' : 'asc');
                            } else {
                              setBranchInfoSortBy('address');
                              setBranchInfoSortOrder('asc');
                            }
                          }}>
                        <div className="flex items-center gap-1">
                          주소
                          {branchInfoSortBy === 'address' && (
                            branchInfoSortOrder === 'asc' ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />
                          )}
                        </div>
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {(() => {
                      const data = getBranchInfoData();
                      const sortedData = [...data].sort((a, b) => {
                        let aVal, bVal;

                        switch(branchInfoSortBy) {
                          case 'no':
                            aVal = a.no;
                            bVal = b.no;
                            break;
                          case 'agency':
                            aVal = a.agency;
                            bVal = b.agency;
                            break;
                          case 'branch':
                            aVal = a.branch;
                            bVal = b.branch;
                            break;
                          case 'agencyBranch':
                            aVal = `${a.agency} ${a.branch}`;
                            bVal = `${b.agency} ${b.branch}`;
                            break;
                          case 'address':
                            aVal = a.address;
                            bVal = b.address;
                            break;
                          case 'phone':
                            aVal = a.phone;
                            bVal = b.phone;
                            break;
                          case 'partnershipDate':
                            aVal = a.partnershipDate;
                            bVal = b.partnershipDate;
                            break;
                          case 'currentMonthAPE':
                            aVal = a.currentMonthAPE;
                            bVal = b.currentMonthAPE;
                            break;
                          case 'totalAgents':
                            aVal = a.totalAgents === '-' ? -1 : parseInt(a.totalAgents);
                            bVal = b.totalAgents === '-' ? -1 : parseInt(b.totalAgents);
                            break;
                          case 'activeAgents':
                            aVal = a.activeAgents === '-' ? -1 : parseInt(a.activeAgents);
                            bVal = b.activeAgents === '-' ? -1 : parseInt(b.activeAgents);
                            break;
                          default:
                            return 0;
                        }

                        if (typeof aVal === 'string' && typeof bVal === 'string') {
                          return branchInfoSortOrder === 'asc'
                            ? aVal.localeCompare(bVal, 'ko-KR')
                            : bVal.localeCompare(aVal, 'ko-KR');
                        }

                        if (aVal < bVal) return branchInfoSortOrder === 'asc' ? -1 : 1;
                        if (aVal > bVal) return branchInfoSortOrder === 'asc' ? 1 : -1;
                        return 0;
                      });

                      return sortedData.map((branch, idx) => (
                      <tr key={idx} className="border-b border-gray-100 hover:bg-gray-50 cursor-pointer"
                          onClick={() => {
                            const queryParams = new URLSearchParams({
                              period: appliedMonth,
                              year: selectedYear,
                              kpi: selectedKPI,
                              product: selectedProduct
                            });
                            navigate(`/branch/${encodeURIComponent(branch.agency)}/${encodeURIComponent(branch.branch)}?${queryParams.toString()}`);
                          }}>
                        {/* 번호 */}
                        <td className="py-3 px-2 text-center border-r border-gray-200 text-xs  text-gray-900">
                          {idx + 1}
                        </td>
                        <td className="py-3 px-3 border-r border-gray-200 text-xs text-black">
                          {branch.agency}
                        </td>
                        <td className="py-3 px-3 border-r border-gray-200 text-xs text-black">
                          {branch.branch}
                        </td>

                        {/* 기본 정보 */}
                        <td className="py-3 px-3 border-r border-gray-200 text-xs text-gray-700">
                          {branch.partnershipDate}
                        </td>

                        {/* 지점 실적 */}
                        <td className="py-3 px-2 text-center border-r border-gray-200">
                          <span className={`text-xs  ${
                            branch.currentMonthAPE > 0 ? 'text-black' : 'text-black'
                          }`}>
                            {branch.currentMonthAPE > 0 ? `${(modalKPI === 'MMP' ? Math.round(branch.currentMonthAPE / 12) : branch.currentMonthAPE).toLocaleString()}` : '-'}
                          </span>
                        </td>

                        {/* 설계사 위촉 - 순서 변경: 가동설계사를 먼저 */}
                        <td className="py-3 px-2 text-center border-r border-gray-200 text-xs  text-black">
                          {branch.activeAgents === '-' || branch.activeAgents === 0 ? '-' : branch.activeAgents}
                        </td>
                        <td className="py-3 px-2 text-center border-r border-gray-200 text-xs  text-gray-900">
                          {branch.totalAgents === '-' ? '-' : branch.totalAgents}
                        </td>

                        {/* 주소를 마지막으로 이동 */}
                        <td className="py-3 px-3 text-xs text-black">
                          {branch.address}
                        </td>
                      </tr>
                    ));
                    })()}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="mt-4 pt-4 border-t border-gray-200 text-center">
              <p className="text-xs text-black">지점명 클릭 시 해당 지점의 상세 분석 화면으로 이동합니다</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Agent360Dashboard;