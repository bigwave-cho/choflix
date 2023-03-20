# Choflix
<img width="600" alt="스크린샷 2023-03-20 10 48 05" src="https://user-images.githubusercontent.com/105909665/226228311-b943908e-5750-4927-a170-e90ec2cdc9f8.png" />

## 프로젝트 소개

- Netflix를 참고하여 Recoil, Framer-motion, React-hook-form 등을 활용해보고자 개인 프로젝트를 진행하게 되었습니다.
- 관련 공식문서와 인터넷 강의 등을 활용하여 기본 레이아웃과 기능을 적용하였고
 창 크기에 따른 반응형 레이아웃과 상태 변화를 추가 적용하였습니다.

### 프로젝트 적용 기술 습득을 위해 만들어본 미니 웹앱
- 코인차트(https://bigwave-cho.github.io/coinchart/) : Recoil(다크모드, 리스트뷰 전환 시 스크롤 위치 기억), Styled-component

### 🗓 수행 기간

> 2023.03.03 - 2022.03.07

### 📢 배포 링크

> https://bigwave-cho.github.io/choflix/

목차
- [기술 스택](#기술-스택)
- [구현 기능](#구현-기능)
- [총평](#총평)

<br>

## 기술 스택
<div>
 <img src="https://img.shields.io/badge/react-61DAFB?style=for-the-badge&logo=react&logoColor=black" /> 
 <img src="https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white" />
 <img src="https://img.shields.io/badge/recoil-f26b00?style=for-the-badge&logo={svg가 변환된텍스트}" />
 <img src="https://img.shields.io/badge/-React%20Query-FF4154?style=for-the-badge&logo=react%20query&logoColor=white" />
 <img src="https://img.shields.io/badge/React%20Hook%20Form-%23EC5990.svg?style=for-the-badge&logo=reacthookform&logoColor=white" />
 </div>
 </br>
 
 > STYLE
 <div>
 <img src="https://img.shields.io/badge/styled--components-DB7093?style=for-the-badge&logo=styled-components&logoColor=white" />
 <img src="https://img.shields.io/badge/Framer-black?style=for-the-badge&logo=framer&logoColor=blue" /> 
 </div>



<br>

## 구현 기능

### 1. 검색 기능
![choflixsearch](https://user-images.githubusercontent.com/105909665/226233425-e61d405a-089e-4398-9e94-3b025e067ed8.gif)
> 📌 React hook form 라이브러리를 이용하여 input의 속성을 외부에서 건드리지 못하게 하고 또한 value, submit 등의 기능 구현 때문에 코드가 길어지는 것을 간략화시켰습니다.

> 📌 돋보기 아이콘을 클릭 시 framer motion을 이용하여 검색창이 나타나도록 구현하였습니다.

> 📌 모바일로 접속할 시 검색창이 메뉴 탭들을 가리지 않도록 반응형 레이아웃을 적용하였습니다.

### 2. slider & 자연스러운 모달창 연동
![choflixslider](https://user-images.githubusercontent.com/105909665/226233019-f0a70fcc-0356-47ee-a8f8-1238a748b1b1.gif)
> 📌 Framer motion을 이용하여 슬라이더를 구현하였으며 각 컨텐츠에 hover 시 스케일 업되어 추가 정보를 부여

> 📌 클릭시 모달과 자연스럽게 이어질 수 있도록 애니메이션을 적용했습니다.

### 3. 반응형 레이아웃
![choflixrespons](https://user-images.githubusercontent.com/105909665/226233734-5d65dba0-d647-4d45-b757-8e1c5705983d.gif)
> 📌 추가적으로 브라우저의 너비에 따라 슬라이더 아이템 개수를 조정하였으며 이 때 Recoil을 사용하여 탭 이동시에도 그대로 유지될 수 있도록 하였습니다.
```js
export const windowWidth = atom({
  key: 'windowWidth',
  default: window.innerWidth,
});

export const slideCnt = selector({
  key: 'slideCnt',
  get: ({ get }) => {
    const width = get(windowWidth);
    if (width > 1400) {
      return 6;
    } else if (width > 1130) {
      return 5;
    } else if (width > 900) {
      return 4;
    } else if (width > 680) {
      return 3;
    } else if (width > 250) {
      return 2;
    } else {
      return 1;
    }
  },
});
```

<br>

## 총평

- 이 사이드 프로젝트는 리액트를 다루는 강의를 들으며 만들었습니다.
- 기본적으로 레이아웃과 framer-motion을 어떻게 사용하여 slider를 구현하는 지에 대해서는 강의 코드를 따라갔습니다.
- 개인적으로 추가 구현한 사항들은 반응형 레이아웃, 반응형에 따른 컴포넌트 개수 변경(with recoil), 슬라이드 방향 전환, 검색 page 구현 등이 있습니다.
- framer-motion을 이용하여 자연스러운 애니메이션을 줄 수 있음에 많은 흥미를 느꼈고 다만 슬라이더 방향 전환을 구현할 때는 단 한줄의 코드때문에 버그가 발생하는 것을 깨닫고
fix해내었을 때 많은 짜릿함을 느꼈습니다.
- 팀프로젝트나 인턴을 하며 스타일적인 면에서 부족함을 많이 느꼈는데 styled component에 대한 이해도가 증가하여 Styled-component를 다양하게 사용할 수 있다는 자신감이 생겼습니다.

<br>



