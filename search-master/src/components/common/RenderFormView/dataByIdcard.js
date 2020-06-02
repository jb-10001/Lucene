/* eslint-disable */
import { checkIdCard, getAgeByIdcard, getBirthdatByIdNo, getSexByIdcard  } from '../../../utils/idCardUtil';
import { gainRegionDesc } from '../../../utils/datatool'

export function dataByIdcard(name, i, v, h) {
  if (name == 'idcard' && checkIdCard(v)) {
    h({
      index: i,
      key: 'censusCode',
      value: v.slice(0, 6),
    });
    h({
      index: i,
      key: 'birthPlace',
      value: v.slice(0, 6),
    });
    h({
      index: i,
      key: 'censusDesc',
      value: gainRegionDesc(v.slice(0, 6)),
    });
    h({
      index: i,
      key: 'birthPlaceDesc',
      value: gainRegionDesc(v.slice(0, 6)),
    });
    h({
      index: i,
      key: 'sex',
      value: getSexByIdcard(v) == '男' ? '1' : '2',
    });
    h({
      index: i,
      key: 'sexDesc',
      value: getSexByIdcard(v) == '男' ? '男性' : '女性',
    });
    h({
      index: i,
      key: 'birthdate',
      value: new Date(getBirthdatByIdNo(v)).getTime(),
    });
  }
}
