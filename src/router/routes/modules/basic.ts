import type { AppRouteModule } from '/@/router/types';

import { LAYOUT } from '/@/router/constant';
import { t } from '/@/hooks/web/useI18n';

const basic: AppRouteModule = {
  path: '/basic',
  name: 'Basic',
  component: LAYOUT,
  redirect: '/basic/materialType',
  meta: {
    orderNo: 10,
    icon: 'ion:grid-outline',
    title: t('basic.title'),
  },
  children: [
    {
      path: 'materialType',
      name: 'materialType',
      component: () => import('/@/views/basic/materialType/index.vue'),
      meta: {
        // affix: true,
        title: t('basic.materialType.title'),
      },
    },
  ],
};

export default basic;
