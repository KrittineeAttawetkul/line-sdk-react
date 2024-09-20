import './progressBar.css'

const ProgressBar = (props) => {
  const { bgcolor, completed } = props;

  const fillerStyles = {
    width: `${completed}%`,
    backgroundColor: bgcolor,
  }

  return (
    <><div className='container' >
      Name
      <div className='containerStyles'>
        <div className='fillerStyles' style={fillerStyles}>
          <img className='pic'
            src="https://fastly.picsum.photos/id/379/200/200.jpg?hmac=bhNTvgVJE_n3o0554kDDTfQtblCx2XUUn5oiwwz5ni8"
          />
        </div>
      </div>
    </div>
    </>
  );
};

export default ProgressBar;