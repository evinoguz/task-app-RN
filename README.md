# Task App

Günlük görevlerin kolayca takip edilmesini sağlayan bir mobil uygulamadır. <br />
Görev ekleme, listeleme, güncelleme ve silme işlemlerini gerçekleştirir. <br />
Gelişmiş filtreleme özelliğiyle görevleri filtreler. <br />
Arama özelliği ile istenilen görevler listelenir. <br />

React Native ile geliştirildi. <br />
StyleSheet ile cihaz boyutlarına uygun responsive tasarlandı.<br />
Navigation ile ekranlar arasında gezinme ve navigasyon işlemleri oluşturuldu. <br />
Lottie ile animasyonlar eklendi. <br />
Toast ile hata ve bilgilendirme durumlarında kullanıcıya anlık bildirimler gösterildi.<br />
## Gif

![](/src/assets/task-app.gif)

## Projenin Çalıştırılması

Projeyi indiriniz veya fork ediniz. 'Visual Studio Code' editörü ile projeyi açınız.

```
git clone https://github.com/evinoguz/task-app-RN.git
```

### Android

Terminalde;

#### Npm

```
npm install
npm run android
```

#### Yarn

```
yarn install
yarn android
```

komutlarıyla gerekli paketleri yükleyiniz ve emülatörü çalıştırınız.

### MacOS

Terminalde;

#### Npm

```
npm install
cd ios
pod install
cd ..
npm run ios
```

#### Yarn

```
yarn install
cd ios
pod install
cd ..
yarn ios
```

komutlarıyla gerekli paketleri yükleyiniz ve simülatörü çalıştırınız.