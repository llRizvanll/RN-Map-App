import {Dimensions} from 'react-native';
const {width, height} = Dimensions.get('window');

export const COLORS = {
  // colors
  black: '#1e1f20',
  blue:'#1565c0',
  white: '#FFFFFF',
  lightGray: '#ABAFB8',
  gray: '#BEC1D2',
  light1: '#f2f2f2',
  light2: '#8c8c8c',
  cat_title_color: '#212121',
};

export const SIZES = {
  // global sizes
  base: 8,
  font: 14,
  radius: 12,
  padding: 24,

  // font sizes
  navTitle: 25,
  h1: 30,
  h2: 22,
  h3: 16,
  h4: 14,
  h5: 12,
  body1: 30,
  body2: 20,
  body3: 16,
  body4: 14,
  body5: 12,

  // app dimensions
  width,
  height,
};

export const FONTS = {
  regularText:{fontFamily: 'Roboto-Black', fontSize: 18},
  navTitle: {fontFamily: 'Roboto-Black', fontSize: SIZES.navTitle},
  largeTitleBold: {fontFamily: 'Roboto-Bold', fontSize: SIZES.h2},
  h1: {fontFamily: 'Roboto-Bold', fontSize: SIZES.h1, lineHeight: 36},
  h2: {fontFamily: 'Roboto-Bold', fontSize: SIZES.h2, lineHeight: 30},
  h3: {fontFamily: 'Roboto-Bold', fontSize: SIZES.h3, lineHeight: 22},
  h4: {fontFamily: 'Roboto-Bold', fontSize: SIZES.h4, lineHeight: 22},
  h5: {fontFamily: 'Roboto-Bold', fontSize: SIZES.h5, lineHeight: 22},
  body1: {
    fontFamily: 'Roboto-Regular',
    fontSize: SIZES.body1,
    lineHeight: 36,
  },
  body2: {
    fontFamily: 'Roboto-Regular',
    fontSize: SIZES.body2,
    lineHeight: 30,
  },
  body3: {
    fontFamily: 'Roboto-Regular',
    fontSize: SIZES.body3,
    lineHeight: 22,
  },
  body4: {
    fontFamily: 'Roboto-Regular',
    fontSize: SIZES.body4,
    lineHeight: 22,
  },
  body5: {
    fontFamily: 'Roboto-Regular',
    fontSize: SIZES.body5,
    lineHeight: 22,
  },
  big_button_text: {fontFamily: 'Roboto-Regular', fontSize: 18, lineHeight: 60},
  checkout_btn_text: {
    fontFamily: 'Roboto-Regular',
    fontSize: 24,
    lineHeight: 60,
  },
  product_title_text: {
    fontFamily: 'Roboto-Bold',
    fontSize: 18,
    lineHeight: 22,
  },
  cart_text: {
    fontFamily: 'Roboto-Bold',
    fontSize: 18,
    lineHeight: 20,
    fontWeight: '400',
  },
  home_btm_text: {
    fontFamily: 'Roboto-Regular',
    fontSize: 14,
    lineHeight: 22,
    fontWeight: '400',
  },
  product_sub_title_text: {
    fontFamily: 'Roboto-Bold',
    fontSize: 16,
    lineHeight: 22,
  },
  cat_title_text: {
    fontFamily: 'Roboto-Bold',
    fontSize: 16,
    lineHeight: 22,
    fontWeight: '400',
  },
  prod_list_title_text: {
    fontFamily: 'Roboto-Bold',
    fontSize: 16,
    lineHeight: 20,
    fontWeight: '500',
  },
  prod_list_brand_title_text: {
    fontFamily: 'Roboto-Bold',
    fontSize: 12,
    lineHeight: 20,
    fontWeight: '400',
  },
  prod_list_offer_title_text: {
    fontFamily: 'Roboto-Bold',
    fontSize: 10,
    lineHeight: 18,
    fontWeight: '400',
  },
  prod_list_price_text: {
    fontFamily: 'Roboto-Regular',
    fontSize: 14,
    lineHeight: 20,
    fontWeight: '400',
  },
  box_shadow: {
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 15,
  },
  home_menu_box_shadow: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,
    elevation: 6,
  },
};

const appTheme = {COLORS, SIZES, FONTS};

export default appTheme;
