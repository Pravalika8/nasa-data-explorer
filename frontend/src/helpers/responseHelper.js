import { AlertType } from "../constants/InputConstant";

const handleResponse = (response, setMessage, setType, setData) => {
    if (response && response.status === 'SUCCESS') {
        setData(response.data);
    } else if (response && response.status === 'ERROR') {
        setMessage(response.message);
        setType(AlertType.ERROR);
        setData([])
    }
}

export default handleResponse;