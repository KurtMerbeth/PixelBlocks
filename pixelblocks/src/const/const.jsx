export const backendserver = "http://localhost:3001";

export async function apiCall(api) {
  return fetch('http://localhost:3001'+api)
    .then(response => response.json())
    .then(async data => {
      return data; 
    })
}

export const BoxGridStyle = {
  maxWidth: '30px',
  maxHeight: '30px',
  minWidth: '30px',
  minHeight: '30px',
  fontSize: '10px',
  justifyContent: 'center',
  alignItems: "center",
  display: "flex",
  textAlignVertical: 'center'
};

export const BoxGridButtonSytle = {
  maxWidth: '30px',
  maxHeight: '30px',
  minWidth: '30px',
  minHeight: '30px',
  fontSize: '10px',
  color: '#969696'
};
export const BoxStyle = {
  border: "0px",
  backgroundColor: "#ededed",
  width: '500px',
  height: '400px'
}
export const ModalStyle = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  margin: "auto",
  marginTop: "-10%"
}

export const DivStyle = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  margin: "25px 25px 25px 25px"
}