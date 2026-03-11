import { BRAND } from '../../constants';

export const PlaceholderPage = ({ title }: { title: string }) => {
  return (
    <div>
      <h1 style={{ fontSize: 24, fontWeight: 700, color: BRAND.dark, marginBottom: 8 }}>{title}</h1>
      <p style={{ fontSize: 14, color: BRAND.gray[500] }}>이 페이지는 준비 중입니다.</p>
    </div>
  );
};
