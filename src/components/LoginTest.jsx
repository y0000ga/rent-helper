import styled from 'styled-components'

const Test = styled.div`
  width: 90%;
  max-width: 500px;
  border-radius: 10px;
  box-shadow: 0px 0px 5px 5px var(--gray);
  background-color: #fff;
  display: flex;
  flex-direction: column;
  align-items: center;
  line-height: 30px;
  margin-top: 20px;
  padding: 20px;
  margin: 500px;
`

const Title = styled.p`
  color: #8b0000;
  font-size: 20px;
`
const Content = styled.p`
  text-align: justify;
  margin-top: 10px;
`

const LoginTest = () => {
  return (
    <Test>
      <Title>測試用帳號</Title>
      <Content>
        <p>
          帳號: user1 <span>密碼: User1</span>
        </p>
        <p>
          已和其他 Line 帳號連結，故僅供平台操作，若使用者需要使用 Line
          通知合適物件，則須自行註冊新的帳號密碼。
        </p>
      </Content>
    </Test>
  )
}

export default LoginTest
