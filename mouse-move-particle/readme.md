# mouse move event particle

![파티클 이미지](./img.gif)

## 마우스의 범위에서 파티클 생성

```
// 마우스의 위치값 및  범위 설정
const mouse = {
  x: null,
  y: null,
  range: 60,
};

...
update() {
// 현재 마우스의 범위 내에서만 파티클의 사이즈를 키운다
  if (
        mouse.x - this.x < mouse.range &&
        mouse.x - this.x > -mouse.range &&
        mouse.y - this.y < mouse.range &&
        mouse.y - this.y > -mouse.range
      ) {
        if (this.size < maxSize) {
          this.size += 3;
        }
      } else {
        this.size -= 0.1;
      }

      if (this.size < 0) this.size = 0;

      ...
}

```

## 초반에 생성되는 파티클, 마우스가 화면을 벗어 났을떄 파티클 지우기

```
setInterval(() => {
  mouse.x = undefined;
  mouse.y = undefined;
}, 1000);
```
