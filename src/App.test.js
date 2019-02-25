import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import Form from './components/Form';
import { shallow, mount } from 'enzyme';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

Enzyme.configure({ adapter: new Adapter() });

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<App />, div);
  ReactDOM.unmountComponentAtNode(div);
});

describe('App component', () => {
  it('starts with empty favorite colors array', () => {
    const wrapper = shallow(<App />)
    const appState = wrapper.state().favColors
    expect(appState.length).toEqual(0)
  });
  it('add a favorite color', () => {
    const wrapper = shallow(<App />)
    
    wrapper.instance().addFavColor({
      email: 'abc@email.com',
      phone: '+1 123 123 12 12',
      color: 'BLACK'
    });

    const appState = wrapper.state().favColors;
    expect(appState.length).toEqual(1);
  })
})

describe('Form component', () => {
  it('validateInput: invalid email input', () => {
    const wrapper = shallow(<Form />)
    wrapper.instance().validateInput('email', 'abc');

    const formState = wrapper.state();
    expect(formState.formErrors.email).toBe('Invalid email adress');
    expect(formState.emailValid).toBeFalsy();
  });
  it('validateInput: invalid phone input', () => {
    const wrapper = shallow(<Form />)
    wrapper.instance().validateInput('phone', '123 123 123');

    const formState = wrapper.state();
    expect(formState.formErrors.phone).toBe('Invalid phone number. Expecting +1 XXX XXX XX XX');
    expect(formState.phoneValid).toBeFalsy();
  });
  it('validateInput: invalid color input - lower case', () => {
    const wrapper = shallow(<Form />)
    wrapper.instance().validateInput('color', 'pink');

    const formState = wrapper.state();
    expect(formState.formErrors.color).toBe('Colors must contain only uppercase alphabets');
    expect(formState.colorValid).toBeFalsy();
  });
  it('validateInput: invalid color input', () => {
    const wrapper = shallow(<Form />)
    wrapper.instance().validateInput('color', 'PINK');

    const formState = wrapper.state();
    expect(formState.formErrors.color).toBe('Invalid color');
    expect(formState.colorValid).toBeFalsy();
  });

  it('validateInput: valid email input', () => {
    const wrapper = shallow(<Form />)
    wrapper.instance().validateInput('email', 'abc@email.com');

    const formState = wrapper.state();
    expect(formState.formErrors.email).toBe('');
    expect(formState.emailValid).toBeTruthy();
  });
  it('validateInput: valid phone input', () => {
    const wrapper = shallow(<Form />)
    wrapper.instance().validateInput('phone', '+1 123 123 12 12');

    const formState = wrapper.state();
    expect(formState.formErrors.phone).toBe('');
    expect(formState.phoneValid).toBeTruthy();
  });
  it('validateInput: valid color input', () => {
    const wrapper = shallow(<Form />)
    wrapper.instance().validateInput('color', 'RED');

    const formState = wrapper.state();
    expect(formState.formErrors.color).toBe('');
    expect(formState.colorValid).toBeTruthy();
  });

  it('Form input has 3 inputs', () => {
    const wrapper = mount(<Form />);

    expect(wrapper.find('input')).toHaveLength(3);
  });
  it('Form input email state change', () => {
    const wrapper = mount(<Form />);

    const emailInput = wrapper.find('#email');
    emailInput.instance().value = 'abc@email.com';
    emailInput.simulate('change');

    const phoneInput = wrapper.find('#phone');
    phoneInput.instance().value = '+1 123 123 12 12';
    phoneInput.simulate('change');

    const colorInput = wrapper.find('#color');
    colorInput.instance().value = 'BLUE';
    colorInput.simulate('change');

    console.log("state: ", wrapper.state());
    //expect(wrapper.state('email')).toBe('abc@email.com');
    expect(wrapper.state('email')).toBe('abc@email.com');
    expect(wrapper.state('phone')).toBe('+1 123 123 12 12');
    expect(wrapper.state('color')).toBe('BLUE');
    expect(wrapper.state('emailValid')).toBeTruthy();
    expect(wrapper.state('phoneValid')).toBeTruthy();
    expect(wrapper.state('colorValid')).toBeTruthy();
  })

})