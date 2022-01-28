import pieChart2Fill from '@iconify/icons-eva/pie-chart-2-fill';
import peopleFill from '@iconify/icons-eva/people-fill';
import shoppingBagFill from '@iconify/icons-eva/shopping-bag-fill';
import fileTextFill from '@iconify/icons-eva/file-text-fill';
import lockFill from '@iconify/icons-eva/lock-fill';
import reportIcon from '@iconify/icons-eva/bar-chart-fill';
import formIcon from '@iconify/icons-eva/file-fill';
import personAddFill from '@iconify/icons-eva/person-add-fill';
import alertTriangleFill from '@iconify/icons-eva/alert-triangle-fill';
import { Icon } from '@iconify/react';

export default class SideBarConfigService {
  getConfig = () => {
    const getIcon = (name) => <Icon icon={name} width={22} height={22} />;

    const role = localStorage.getItem('role');
    let sidebarConfig = [];

    if (role === 'ROLE_ADMIN') {
      sidebarConfig = [
        {
          title: 'dashboard',
          path: '/dashboard/app',
          icon: getIcon(pieChart2Fill)
        },
        {
          title: 'User Management',
          path: '/dashboard/userManagement',
          icon: getIcon(formIcon),
          children: [
            {
              title: 'Create User',
              path: '/dashboard/userManagement/createUser',
              icon: getIcon(reportIcon)
            }
          ]
        },
        {
          title: 'forms',
          path: '/dashboard/forms',
          icon: getIcon(formIcon),
          children: [
            {
              title: 'New Client Form',
              path: '/dashboard/forms/newClientForm',
              icon: getIcon(reportIcon)
            },
            {
              title: 'Tail Gate Talk Form',
              path: '/dashboard/forms/tailGateTalkForm',
              icon: getIcon(reportIcon)
            }
          ]
        },
        {
          title: 'Charts',
          path: '/dashboard/charts',
          icon: getIcon(formIcon),
          children: [
            {
              title: 'Bar Chart Ex',
              path: '/dashboard/charts/barchart',
              icon: getIcon(reportIcon)
            }
          ]
        },
        {
          title: 'Saved Froms',
          path: '/dashboard/savedForms',
          icon: getIcon(formIcon),
          children: [
            {
              title: 'New Client Saved Form',
              path: '/dashboard/savedForms/newClientForm',
              icon: getIcon(reportIcon)
            },
            {
              title: 'Tail Gate Talk Saved Form',
              path: '/dashboard/savedForms/tailGateTalkForm',
              icon: getIcon(reportIcon)
            }
          ]
        },
        {
          title: 'Talks',
          path: '/dashboard/talks',
          icon: getIcon(formIcon)
        },
        {
          title: 'Time Card',
          path: '/dashboard/timeCard',
          icon: getIcon(formIcon),
          children: [
            {
              title: 'Time Card Entering',
              path: '/dashboard/timeCard/entering',
              icon: getIcon(reportIcon)
            },
            {
              title: 'Time Cards',
              path: '/dashboard/timeCard/timeCards',
              icon: getIcon(reportIcon)
            }
          ]
        },
        {
          title: 'reports',
          path: '/dashboard/reports',
          icon: getIcon(reportIcon),
          children: [
            {
              title: 'Time Card Report',
              path: '/dashboard/reports/timeCardReport',
              icon: getIcon(reportIcon)
            }
          ]
        },
      ];
    } else if (role === 'ROLE_USER') {
      sidebarConfig = [
        {
          title: 'forms',
          path: '/dashboard/forms',
          icon: getIcon(formIcon),
          children: [
            {
              title: 'newClientForm',
              path: '/dashboard/newClientForm',
              icon: getIcon(reportIcon)
            },
            {
              title: 'form2',
              path: '/dashboard/form2',
              icon: getIcon(reportIcon)
            }
          ]
        },
        {
          title: 'Time Card',
          path: '/dashboard/timeCard',
          icon: getIcon(formIcon),
          children: [
            {
              title: 'Time Card Entering',
              path: '/dashboard/timeCard/entering',
              icon: getIcon(reportIcon)
            },
            {
              title: 'Time Cards',
              path: '/dashboard/timeCard/timeCards',
              icon: getIcon(reportIcon)
            }
          ]
        }
      ];
    }

    return sidebarConfig;
  };
}
