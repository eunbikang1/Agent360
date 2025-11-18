import * as XLSX from 'xlsx';

/**
 * 엑셀 다운로드 유틸리티 함수
 */

/**
 * 워크북을 엑셀 파일로 다운로드
 */
export const downloadExcelFile = (workbook: XLSX.WorkBook, filename: string) => {
  const wbout = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
  const blob = new Blob([wbout], { type: 'application/octet-stream' });
  const url = window.URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = `${filename}.xlsx`;
  link.click();
  window.URL.revokeObjectURL(url);
};

/**
 * Agent360Dashboard 엑셀 생성
 */
export const exportAgent360ToExcel = (
  branchesData: any[],
  dailyData: any[],
  productData: any[],
  kpiData: any,
  period: string,
  performanceType: 'APE' | 'MMP'
) => {
  const wb = XLSX.utils.book_new();

  // 시트1: 지점별 종합 지표
  const branchSheetData = [
    ['Agent360 대시보드 - 지점별 종합 지표'],
    ['조회기간', period],
    ['실적기준', performanceType],
    [],
    ['대리점', '지점명', '목표달성률(%)', `${performanceType}(백만원)`, '목표(백만원)', '설계사수(명)', '설계(건)', '청약(건)', '모바일청약(%)', '지점장', '연락처', '주소']
  ];

  branchesData.forEach((branch) => {
    branchSheetData.push([
      branch.agency || '',
      branch.branch || '',
      branch.achievement || 0,
      branch.ape ? (branch.ape / 1000000).toFixed(1) : '0',
      branch.target || 0,
      branch.agentCount || 0,
      branch.designCount || 0,
      branch.contractCount || 0,
      branch.mobileRate || 0,
      branch.manager || '',
      branch.phone || '',
      branch.address || ''
    ]);
  });

  const branchSheet = XLSX.utils.aoa_to_sheet(branchSheetData);

  // 열 너비 설정
  branchSheet['!cols'] = [
    { wch: 20 }, // 대리점
    { wch: 25 }, // 지점명
    { wch: 15 }, // 목표달성률
    { wch: 15 }, // APE/MMP
    { wch: 15 }, // 목표
    { wch: 12 }, // 설계사수
    { wch: 12 }, // 설계
    { wch: 12 }, // 청약
    { wch: 15 }, // 모바일청약률
    { wch: 12 }, // 지점장
    { wch: 15 }, // 연락처
    { wch: 35 }  // 주소
  ];

  XLSX.utils.book_append_sheet(wb, branchSheet, '지점별 종합지표');

  // 시트2: 상품군별 데이터
  const productSheetData = [
    ['Agent360 대시보드 - 상품군별 실적'],
    ['조회기간', period],
    ['실적기준', performanceType],
    [],
    ['상품군', '비율(%)', '금액(백만원)', '건수(건)']
  ];

  productData.forEach((product) => {
    productSheetData.push([
      product.name || '',
      product.value || 0,
      product.amount ? (product.amount / 1000000).toFixed(1) : '0',
      product.count || 0
    ]);
  });

  const productSheet = XLSX.utils.aoa_to_sheet(productSheetData);

  productSheet['!cols'] = [
    { wch: 20 }, // 상품군
    { wch: 12 }, // 비율
    { wch: 18 }, // 금액
    { wch: 12 }  // 건수
  ];

  XLSX.utils.book_append_sheet(wb, productSheet, '상품군별');

  // 시트3: 일별 실적 데이터
  const dailySheetData = [
    ['Agent360 대시보드 - 일별 실적'],
    ['조회기간', period],
    ['실적기준', performanceType],
    [],
    ['일자', `${performanceType}(백만원)`, '청약(건)', '설계(건)', '영업일여부']
  ];

  dailyData.forEach((day) => {
    const dayNum = day.day || 0;
    const yearMonth = period.split('-');
    const dateStr = `${yearMonth[0]}-${yearMonth[1]}-${dayNum.toString().padStart(2, '0')}`;

    dailySheetData.push([
      dateStr,
      day.apeAmount ? (day.apeAmount / 10000).toFixed(1) : '0', // 만원 단위로 저장되어 있으므로 백만원으로 변환
      day.contractCount || 0,
      day.proposalCount || 0,
      day.isWeekend ? '휴일' : '영업일'
    ]);
  });

  const dailySheet = XLSX.utils.aoa_to_sheet(dailySheetData);

  dailySheet['!cols'] = [
    { wch: 12 }, // 일자
    { wch: 18 }, // APE/MMP
    { wch: 12 }, // 청약
    { wch: 12 }, // 설계
    { wch: 12 }  // 영업일여부
  ];

  XLSX.utils.book_append_sheet(wb, dailySheet, '일별실적');

  // 시트4: KPI 요약
  const kpiSheetData = [
    ['Agent360 대시보드 - KPI 요약'],
    ['조회기간', period],
    ['실적기준', performanceType],
    [],
    ['KPI 항목', '현재값', '목표/계획', '본부평균', '전국평균', '전월대비'],
    ['목표달성률(%)', kpiData.goalAchievement?.current || 0, '', kpiData.goalAchievement?.hqAvg || 0, kpiData.goalAchievement?.nationalAvg || 0, kpiData.goalAchievement?.vsLastMonth || 0],
    ['설계사 가동률(%)', kpiData.designerActivity?.current || 0, '', kpiData.designerActivity?.hqAvg || 0, kpiData.designerActivity?.nationalAvg || 0, kpiData.designerActivity?.vsLastMonthPercent || 0],
    ['모바일 청약률(%)', kpiData.mobileContract?.current || 0, '', kpiData.mobileContract?.hqAvg || 0, kpiData.mobileContract?.nationalAvg || 0, kpiData.mobileContract?.vsLastMonthPercent || 0],
    [],
    ['실적 상세'],
    [`${performanceType} 실적(백만원)`, kpiData.goalAchievement?.actual ? (kpiData.goalAchievement.actual / 1000000).toFixed(1) : '0'],
    [`${performanceType} 목표(백만원)`, kpiData.goalAchievement?.target ? (kpiData.goalAchievement.target / 1000000).toFixed(1) : '0'],
    [`${performanceType} 차이(백만원)`, kpiData.goalAchievement?.gap ? (kpiData.goalAchievement.gap / 1000000).toFixed(1) : '0'],
    ['일평균 필요(백만원)', kpiData.goalAchievement?.dailyRequired ? (kpiData.goalAchievement.dailyRequired / 1000000).toFixed(1) : '0'],
    [],
    ['설계사 현황'],
    ['가동 설계사(명)', kpiData.designerActivity?.active || 0],
    ['재적 설계사(명)', kpiData.designerActivity?.total || 0],
    [],
    ['청약 현황'],
    ['모바일 청약(건)', kpiData.mobileContract?.count || 0],
    ['전체 청약(건)', kpiData.mobileContract?.total || 0]
  ];

  const kpiSheet = XLSX.utils.aoa_to_sheet(kpiSheetData);

  kpiSheet['!cols'] = [
    { wch: 20 }, // KPI 항목
    { wch: 15 }, // 현재값
    { wch: 15 }, // 목표/계획
    { wch: 12 }, // 본부평균
    { wch: 12 }, // 전국평균
    { wch: 12 }  // 전월대비
  ];

  XLSX.utils.book_append_sheet(wb, kpiSheet, 'KPI요약');

  // 파일명 생성
  const filename = `Agent360_대시보드_${period.replace('-', '')}_${performanceType}`;

  downloadExcelFile(wb, filename);
};

/**
 * Branch360Dashboard 엑셀 생성
 */
export const exportBranch360ToExcel = (
  branchInfo: any,
  dailyData: any[],
  agentsData: any[],
  productData: any[],
  kpiData: any,
  period: string,
  performanceType: 'APE' | 'MMP'
) => {
  const wb = XLSX.utils.book_new();

  // 시트1: 지점 기본 정보 및 KPI
  const infoSheetData = [
    ['Branch360 대시보드 - 지점 상세 정보'],
    ['조회기간', period],
    ['실적기준', performanceType],
    [],
    ['기본 정보'],
    ['대리점', branchInfo.agency || ''],
    ['지점명', branchInfo.branch || ''],
    ['지점장', branchInfo.manager || ''],
    ['연락처', branchInfo.phone || ''],
    ['주소', branchInfo.address || ''],
    [],
    ['실적 지표'],
    ['구분', '값'],
    [`${performanceType}(백만원)`, branchInfo.ape ? (branchInfo.ape / 1000000).toFixed(1) : '0'],
    ['목표(백만원)', branchInfo.target || 0],
    ['목표달성률(%)', branchInfo.achievement || 0],
    ['설계사수(명)', branchInfo.agentCount || 0],
    ['가동설계사(명)', branchInfo.activeAgents || 0],
    ['설계(건)', branchInfo.designCount || 0],
    ['청약(건)', branchInfo.contractCount || 0],
    ['모바일청약률(%)', branchInfo.mobileRate || 0]
  ];

  const infoSheet = XLSX.utils.aoa_to_sheet(infoSheetData);

  infoSheet['!cols'] = [
    { wch: 25 }, // 항목
    { wch: 40 }  // 값
  ];

  XLSX.utils.book_append_sheet(wb, infoSheet, '지점정보');

  // 시트2: 일별 실적 데이터
  const dailySheetData = [
    ['Branch360 대시보드 - 일별 실적'],
    ['조회기간', period],
    ['지점', `${branchInfo.agency} - ${branchInfo.branch}`],
    [],
    ['일자', `${performanceType}(백만원)`, '청약(건)', '설계(건)', '영업일여부']
  ];

  dailyData.forEach((day) => {
    const dayNum = day.day || 0;
    const yearMonth = period.split('-');
    const dateStr = `${yearMonth[0]}-${yearMonth[1]}-${dayNum.toString().padStart(2, '0')}`;

    dailySheetData.push([
      dateStr,
      day.apeAmount ? (day.apeAmount / 1000000).toFixed(1) : '0',
      day.contractCount || 0,
      day.proposalCount || 0,
      day.isWeekend ? '휴일' : '영업일'
    ]);
  });

  const dailySheet = XLSX.utils.aoa_to_sheet(dailySheetData);

  dailySheet['!cols'] = [
    { wch: 12 }, // 일자
    { wch: 18 }, // APE/MMP
    { wch: 12 }, // 청약
    { wch: 12 }, // 설계
    { wch: 12 }  // 영업일여부
  ];

  XLSX.utils.book_append_sheet(wb, dailySheet, '일별실적');

  // 시트3: 설계사별 데이터
  const agentsSheetData = [
    ['Branch360 대시보드 - 설계사별 실적'],
    ['조회기간', period],
    ['지점', `${branchInfo.agency} - ${branchInfo.branch}`],
    [],
    ['설계사코드', '설계사명', '수수료월차', '당월MMP(백만원)', '전월MMP(백만원)', '증감(백만원)', '증감률(%)', '가동여부']
  ];

  agentsData.forEach((agent) => {
    const currentMMP = agent.currentMonth?.premium || 0;
    const previousMMP = agent.previousMonth?.premium || 0;
    const diff = currentMMP - previousMMP;
    const diffRate = previousMMP > 0 ? ((diff / previousMMP) * 100).toFixed(1) : '0';

    agentsSheetData.push([
      agent.agentCode || '',
      agent.name || '',
      agent.commissionMonth || '',
      (currentMMP / 1000000).toFixed(1),
      (previousMMP / 1000000).toFixed(1),
      (diff / 1000000).toFixed(1),
      diffRate,
      previousMMP > 0 ? '가동' : '미가동'
    ]);
  });

  const agentsSheet = XLSX.utils.aoa_to_sheet(agentsSheetData);

  agentsSheet['!cols'] = [
    { wch: 15 }, // 설계사코드
    { wch: 12 }, // 설계사명
    { wch: 12 }, // 수수료월차
    { wch: 18 }, // 당월MMP
    { wch: 18 }, // 전월MMP
    { wch: 18 }, // 증감
    { wch: 12 }, // 증감률
    { wch: 12 }  // 가동여부
  ];

  XLSX.utils.book_append_sheet(wb, agentsSheet, '설계사별실적');

  // 시트4: 상품별 데이터
  const productSheetData = [
    ['Branch360 대시보드 - 상품별 실적'],
    ['조회기간', period],
    ['지점', `${branchInfo.agency} - ${branchInfo.branch}`],
    [],
    ['상품군', '비율(%)', '금액(백만원)', '건수(건)']
  ];

  productData.forEach((product) => {
    productSheetData.push([
      product.name || '',
      product.value || 0,
      product.amount ? (product.amount / 1000000).toFixed(1) : '0',
      product.count || 0
    ]);
  });

  const productSheet = XLSX.utils.aoa_to_sheet(productSheetData);

  productSheet['!cols'] = [
    { wch: 20 }, // 상품군
    { wch: 12 }, // 비율
    { wch: 18 }, // 금액
    { wch: 12 }  // 건수
  ];

  XLSX.utils.book_append_sheet(wb, productSheet, '상품별실적');

  // 파일명 생성
  const filename = `Branch360_${branchInfo.agency}_${branchInfo.branch}_${period.replace('-', '')}_${performanceType}`;

  downloadExcelFile(wb, filename);
};
