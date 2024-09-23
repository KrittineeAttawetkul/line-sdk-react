import './progressBar.css'
import silverIcon from '../../assets/silverIcon.png'
import goldIcon from '../../assets/goldIcon.png'
import platinumIcon from '../../assets/platinumIcon.png'

const ProgressBar = (props) => {
  const { lv_name, completed, name } = props;


  let bgcolor;
  let icon;
  if (lv_name === 'Silver') {
    bgcolor = '#CFCFCF';
    icon = silverIcon
  } else if (lv_name === 'Gold') {
    bgcolor = '#FFB743';
    icon = goldIcon
  } else if (lv_name === 'Platinum') {
    bgcolor = '#3498A6';
    icon = platinumIcon
  }

  const fillerStyles = {
    width: `${completed}%`,
    backgroundColor: bgcolor,
  };

  return (
    <><div className='ProgressBar-container' >
      <div className='ProgressBar-name'>
        {name}
      </div>
      <div className='containerStyles'>
        <div className='fillerStyles' style={fillerStyles}>
          <img className='pic'
            // src="https://fastly.picsum.photos/id/379/200/200.jpg?hmac=bhNTvgVJE_n3o0554kDDTfQtblCx2XUUn5oiwwz5ni8"
            src={icon}
          />
        </div>
      </div>
    </div>
    </>
  );
};

export default ProgressBar;