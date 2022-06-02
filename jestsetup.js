// setup file
import { configure, shallow, render, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import 'regenerator-runtime/runtime'

configure({ adapter: new Adapter() });
global.shallow = shallow;
global.render = render;
global.mount = mount;
