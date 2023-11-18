import axios from 'axios';
import login from './index';
import baseUrl from '@/app/utils/baseUrl';

jest.mock('axios');
describe('login', () => {
  it('should set the token cookie when login is successful', async () => {
    const data = { username: 'testuser', password: 'testpassword' };
    const response = {
      data: {
        access_token: 'testtoken'
      }
    };
    (axios.post as jest.Mock).mockResolvedValue(response);
    const setMock = jest.fn();

    // Mock the cookies function
    jest.mock('cookies', () => ({
      __esModule: true,
      default: () => ({
        set: setMock
      })
    }));

    await login(data);

    expect(axios.post).toHaveBeenCalledWith(`${baseUrl}/auth/log-in`, data);
    expect(setMock).toHaveBeenCalledWith('token', response.data.access_token);
  });

  it('should show an error message when login fails', async () => {
    const data = { username: 'testuser', password: 'testpassword' };
    const error = 'Invalid credentials';
    (axios.post as jest.Mock).mockRejectedValue(error);
    const fireMock = jest.fn();

    // Mock the Swal.fire function
    jest.mock('sweetalert2', () => ({
      __esModule: true,
      default: {
        fire: fireMock
      }
    }));

    await login(data);

    expect(axios.post).toHaveBeenCalledWith(`${baseUrl}/auth/log-in`, data);
    expect(fireMock).toHaveBeenCalledWith({
      icon: 'error',
      title: 'Ups...',
      text: 'El usuario o la contraseña son incorrectos',
      footer: error
    });
  });
});