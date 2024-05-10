const regionData = {
  "0": { id: 0, name: "전체" },
  "1": {
    id: 1,
    name: "서울",
    children: [
      { id: 0, name: "전체" },
      { id: 1, name: "강남구" },
      { id: 2, name: "강동구" },
      { id: 3, name: "강북구" },
      { id: 4, name: "강서구" },
      { id: 5, name: "관악구" },
      { id: 6, name: "광진구" },
      { id: 7, name: "구로구" },
      { id: 8, name: "금천구" },
      { id: 9, name: "노원구" },
      { id: 10, name: "도봉구" },
      { id: 11, name: "동대문구" },
      { id: 12, name: "동작구" },
      { id: 13, name: "마포구" },
      { id: 14, name: "서대문구" },
      { id: 15, name: "서초구" },
      { id: 16, name: "성동구" },
      { id: 17, name: "성북구" },
      { id: 18, name: "송파구" },
      { id: 19, name: "양천구" },
      { id: 20, name: "영등포구" },
      { id: 21, name: "용산구" },
      { id: 22, name: "은평구" },
      { id: 23, name: "종로구" },
      { id: 24, name: "중구" },
      { id: 25, name: "중랑구" }
    ]
  },
  "2": {
    id: 2,
    name: "인천",
    children: [
      { id: 0, name: "전체" },
      { id: 1, name: "강화군" },
      { id: 2, name: "계양구" },
      { id: 3, name: "미추홀구" },
      { id: 4, name: "남동구" },
      { id: 5, name: "동구" },
      { id: 6, name: "부평구" },
      { id: 7, name: "서구" },
      { id: 8, name: "연수구" },
      { id: 9, name: "옹진군" },
      { id: 10, name: "중구" }
    ]
  },
  "3": {
    id: 3,
    name: "대전",
    children: [
      { id: 0, name: "전체" },
      { id: 1, name: "대덕구" },
      { id: 2, name: "동구" },
      { id: 3, name: "서구" },
      { id: 4, name: "유성구" },
      { id: 5, name: "중구" }
    ]
  },
  "4": {
    id: 4,
    name: "대구",
    children: [
      { id: 0, name: "전체" },
      { id: 1, name: "남구" },
      { id: 2, name: "달서구" },
      { id: 3, name: "달성군" },
      { id: 4, name: "동구" },
      { id: 5, name: "북구" },
      { id: 6, name: "서구" },
      { id: 7, name: "수성구" },
      { id: 8, name: "중구" }
    ]
  },
  "5": {
    id: 5,
    name: "광주",
    children: [
      { id: 0, name: "전체" },
      { id: 1, name: "광산구" },
      { id: 2, name: "남구" },
      { id: 3, name: "동구" },
      { id: 4, name: "북구" },
      { id: 5, name: "서구" }
    ]
  },
  "6": {
    id: 6,
    name: "부산",
    children: [
      { id: 0, name: "전체" },
      { id: 1, name: "강서구" },
      { id: 2, name: "금정구" },
      { id: 3, name: "기장군" },
      { id: 4, name: "남구" },
      { id: 5, name: "동구" },
      { id: 6, name: "동래구" },
      { id: 7, name: "부산진구" },
      { id: 8, name: "북구" },
      { id: 9, name: "사상구" },
      { id: 10, name: "사하구" },
      { id: 11, name: "서구" },
      { id: 12, name: "수영구" },
      { id: 13, name: "연제구" },
      { id: 14, name: "영도구" },
      { id: 15, name: "중구" },
      { id: 16, name: "해운대구" }
    ]
  },
  "7": {
    id: 7,
    name: "울산",
    children: [
      { id: 0, name: "전체" },
      { id: 1, name: "중구" },
      { id: 2, name: "남구" },
      { id: 3, name: "동구" },
      { id: 4, name: "북구" },
      { id: 5, name: "울주군" }
    ]
  },
  "8": {
    id: 8,
    name: "세종특별자치시",
    children: [
      { id: 0, name: "전체" },
      { id: 1, name: "세종특별자치시" }
    ]
  },
  "31": {
    id: 31,
    name: "경기도",
    children: [
      { id: 0, name: "전체" },
      { id: 1, name: "가평군" },
      { id: 2, name: "고양시" },
      { id: 3, name: "과천시" },
      { id: 4, name: "광명시" },
      { id: 5, name: "광주시" },
      { id: 6, name: "구리시" },
      { id: 7, name: "군포시" },
      { id: 8, name: "김포시" },
      { id: 9, name: "남양주시" },
      { id: 10, name: "동두천시" },
      { id: 11, name: "부천시" },
      { id: 12, name: "성남시" },
      { id: 13, name: "수원시" },
      { id: 14, name: "시흥시" },
      { id: 15, name: "안산시" },
      { id: 16, name: "안성시" },
      { id: 17, name: "안양시" },
      { id: 18, name: "양주시" },
      { id: 19, name: "양평군" },
      { id: 20, name: "여주시" },
      { id: 21, name: "연천군" },
      { id: 22, name: "오산시" },
      { id: 23, name: "용인시" },
      { id: 24, name: "의왕시" },
      { id: 25, name: "의정부시" },
      { id: 26, name: "이천시" },
      { id: 27, name: "파주시" },
      { id: 28, name: "평택시" },
      { id: 29, name: "포천시" },
      { id: 30, name: "하남시" },
      { id: 31, name: "화성시" }
    ]
  },
  "32": {
    id: 32,
    name: "강원도",
    children: [
      { id: 0, name: "전체" },
      { id: 1, name: "강릉시" },
      { id: 2, name: "고성군" },
      { id: 3, name: "동해시" },
      { id: 4, name: "삼척시" },
      { id: 5, name: "속초시" },
      { id: 6, name: "양구군" },
      { id: 7, name: "양양군" },
      { id: 8, name: "영월군" },
      { id: 9, name: "원주시" },
      { id: 10, name: "인제군" },
      { id: 11, name: "정선군" },
      { id: 12, name: "철원군" },
      { id: 13, name: "춘천시" },
      { id: 14, name: "태백시" },
      { id: 15, name: "평창군" },
      { id: 16, name: "홍천군" },
      { id: 17, name: "화천군" },
      { id: 18, name: "횡성군" }
    ]
  },
  "33": {
    id: 33,
    name: "충청북도",
    children: [
      { id: 0, name: "전체" },
      { id: 1, name: "괴산군" },
      { id: 2, name: "단양군" },
      { id: 3, name: "보은군" },
      { id: 4, name: "영동군" },
      { id: 5, name: "옥천군" },
      { id: 6, name: "음성군" },
      { id: 7, name: "제천시" },
      { id: 8, name: "진천군" },
      { id: 9, name: "청원군" },
      { id: 10, name: "청주시" },
      { id: 11, name: "충주시" },
      { id: 12, name: "증평군" }
    ]
  },
  "34": {
    id: 34,
    name: "충청남도",
    children: [
      { id: 0, name: "전체" },
      { id: 1, name: "공주시" },
      { id: 2, name: "금산군" },
      { id: 3, name: "논산시" },
      { id: 4, name: "당진시" },
      { id: 5, name: "보령시" },
      { id: 6, name: "부여군" },
      { id: 7, name: "서산시" },
      { id: 8, name: "서천군" },
      { id: 9, name: "아산시" },
      { id: 10, name: "예산군" },
      { id: 11, name: "천안시" },
      { id: 12, name: "청양군" },
      { id: 13, name: "태안군" },
      { id: 14, name: "홍성군" },
      { id: 15, name: "계룡시" }
    ]
  },
  "35": {
    id: 35,
    name: "경상북도",
    children: [
      { id: 0, name: "전체" },
      { id: 1, name: "경산시" },
      { id: 2, name: "경주시" },
      { id: 3, name: "고령군" },
      { id: 4, name: "구미시" },
      { id: 5, name: "군위군" },
      { id: 6, name: "김천시" },
      { id: 7, name: "문경시" },
      { id: 8, name: "봉화군" },
      { id: 9, name: "상주시" },
      { id: 10, name: "성주군" },
      { id: 11, name: "안동시" },
      { id: 12, name: "영덕군" },
      { id: 13, name: "영양군" },
      { id: 14, name: "영주시" },
      { id: 15, name: "영천시" },
      { id: 16, name: "예천군" },
      { id: 17, name: "울릉군" },
      { id: 18, name: "울진군" },
      { id: 19, name: "의성군" },
      { id: 20, name: "청도군" },
      { id: 21, name: "청송군" },
      { id: 22, name: "칠곡군" },
      { id: 23, name: "포항시" }
    ]
  },
  "36": {
    id: 36,
    name: "경상남도",
    children: [
      { id: 0, name: "전체" },
      { id: 1, name: "거제시" },
      { id: 2, name: "거창군" },
      { id: 3, name: "고성군" },
      { id: 4, name: "김해시" },
      { id: 5, name: "남해군" },
      { id: 6, name: "마산시" },
      { id: 7, name: "밀양시" },
      { id: 8, name: "사천시" },
      { id: 9, name: "산청군" },
      { id: 10, name: "양산시" },
      { id: 11, name: "의령군" },
      { id: 12, name: "진주시" },
      { id: 13, name: "진해시" },
      { id: 14, name: "창녕군" },
      { id: 15, name: "창원시" },
      { id: 16, name: "통영시" },
      { id: 17, name: "하동군" },
      { id: 18, name: "함안군" },
      { id: 19, name: "함양군" },
      { id: 20, name: "합천군" }
    ]
  },
  "37": {
    id: 37,
    name: "전라북도",
    children: [
      { id: 0, name: "전체" },
      { id: 1, name: "고창군" },
      { id: 2, name: "군산시" },
      { id: 3, name: "김제시" },
      { id: 4, name: "남원시" },
      { id: 5, name: "무주군" },
      { id: 6, name: "부안군" },
      { id: 7, name: "순창군" },
      { id: 8, name: "완주군" },
      { id: 9, name: "익산시" },
      { id: 10, name: "임실군" },
      { id: 11, name: "장수군" },
      { id: 12, name: "전주시" },
      { id: 13, name: "정읍시" },
      { id: 14, name: "진안군" }
    ]
  },
  "38": {
    id: 38,
    name: "전라남도",
    children: [
      { id: 0, name: "전체" },
      { id: 1, name: "강진군" },
      { id: 2, name: "고흥군" },
      { id: 3, name: "곡성군" },
      { id: 4, name: "광양시" },
      { id: 5, name: "구례군" },
      { id: 6, name: "나주시" },
      { id: 7, name: "담양군" },
      { id: 8, name: "목포시" },
      { id: 9, name: "무안군" },
      { id: 10, name: "보성군" },
      { id: 11, name: "순천시" },
      { id: 12, name: "신안군" },
      { id: 13, name: "여수시" },
      { id: 16, name: "영광군" },
      { id: 17, name: "영암군" },
      { id: 18, name: "완도군" },
      { id: 19, name: "장성군" },
      { id: 20, name: "장흥군" },
      { id: 21, name: "진도군" },
      { id: 22, name: "함평군" },
      { id: 23, name: "해남군" },
      { id: 24, name: "화순군" }
    ]
  },
  "39": {
    id: 39,
    name: "제주도",
    children: [
      { id: 0, name: "전체" },
      { id: 1, name: "남제주군" },
      { id: 2, name: "북제주군" },
      { id: 3, name: "서귀포시" },
      { id: 4, name: "제주시" }
    ]
  }
};


export default regionData