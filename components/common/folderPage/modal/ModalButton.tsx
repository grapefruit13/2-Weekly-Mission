import styled from "styled-components";

const Button = styled.button`
  width: 280px;
  padding: 16px 20px;
  gap: 10px;
  border-radius: 8px;
  border: none;
  color: var(--Grey-Light, #f5f5f5);
  font-size: 16px;
  font-weight: 600;
  background: ${(props) =>
    props.color === "blue"
      ? "linear-gradient(91deg, #6D6AFE 0.12%, #6AE3FE 101.84%)"
      : "var(--Linkbrary-red, #FF5B56)"};
`;

export default function ModalButton({
  color = "",
  text = "",
}: {
  color: string;
  text: string;
}) {
  return (
    <>
      <Button color={color}>{text}</Button>
    </>
  );
}
