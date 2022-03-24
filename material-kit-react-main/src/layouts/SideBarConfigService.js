import peopleFill from '@iconify/icons-eva/people-fill';
import lockFill from '@iconify/icons-eva/lock-fill';
import reportIcon from '@iconify/icons-eva/bar-chart-fill';
import formIcon from '@iconify/icons-eva/file-fill';
import personAddFill from '@iconify/icons-eva/person-add-fill';
import alertTriangleFill from '@iconify/icons-eva/sun-fill';
import timeCardIcon from '@iconify/icons-eva/calendar-fill';
import certificatesIcon from '@iconify/icons-eva/file-fill';
import {Icon} from '@iconify/react';

export default class SideBarConfigService {
  getConfig = () => {
    const getIcon = (name) => <Icon icon={name} width={22} height={22} />;

    const role = localStorage.getItem('role');
    let sidebarConfig = [];
    //|| role === 'ROLE_FOREMAN') {
    if (role === 'ROLE_SUPERVISOR') {
      sidebarConfig = [
        {
          title: 'User Management',
          path: '/dashboard/userManagement',
          icon: getIcon(peopleFill),
          children: [
            {
              title: 'Create User',
              path: '/dashboard/userManagement/createUser',
              icon: getIcon(personAddFill)
            },
            {
              title: 'Saved Users',
              path: '/dashboard/userManagement/users',
              icon: getIcon(personAddFill)
            }
          ]
        },
          {
              title: 'Project Operations',
              path: '/dashboard/project',
              icon: getIcon(lockFill),
              children: [
                  {
                      title: 'Project Estimate Template',
                      path: '/dashboard/project/estimateTemplate',
                      icon: getIcon(reportIcon)
                  },
                {
                      title: 'Saved Project Estimate Template',
                      path: '/dashboard/project/savedEstimateTemplate',
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
            },
            {
              title: 'Pre Job Safety Form',
              path: '/dashboard/forms/preJobSafetyForm',
              icon: getIcon(reportIcon)
            },
            {
              title: 'Emergency Form',
              path: '/dashboard/forms/emergencyForm',
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
            },
            {
              title: 'Pre Job Safety Saved Form',
              path: '/dashboard/savedForms/preJobSafetyForm',
              icon: getIcon(reportIcon)
            },
            {
              title: 'Emergency Saved Form',
              path: '/dashboard/savedForms/emergencyForm',
              icon: getIcon(reportIcon)
            }
          ]
        },
        {
          title: 'Inventory Operations',
          path: '/dashboard/inventory',
          icon: getIcon(formIcon),
          children: [
            {
              title: 'Hospital Form',
              path: '/dashboard/inventory/hospitalForm',
              icon: getIcon(reportIcon)
            },
            {
              title: 'Saved Hospital Form',
              path: '/dashboard/inventory/savedHospitalForm',
              icon: getIcon(reportIcon)
            }
          ]
        },
        {
          title: 'Talks',
          path: '/dashboard/talks',
          icon: getIcon(alertTriangleFill)
        },
        {
          title: 'Time Card',
          path: '/dashboard/timeCard',
          icon: getIcon(timeCardIcon),
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
            },
            {
              title: 'Paving Milling Report',
              path: '/dashboard/reports/pavingMillingReport',
              icon: getIcon(reportIcon)
            }
          ]
        },
      ];
    }else if(role === 'ROLE_FOREMAN'){
        sidebarConfig = [
          {
            title: 'User Management',
            path: '/dashboard/userManagement',
            icon: getIcon(peopleFill),
            children: [
              {
                title: 'Create User',
                path: '/dashboard/userManagement/createUser',
                icon: getIcon(personAddFill)
              },
              {
                title: 'Saved Users',
                path: '/dashboard/userManagement/users',
                icon: getIcon(personAddFill)
              }
            ]
          },
          {
            title: 'Project Operations',
            path: '/dashboard/project',
            icon: getIcon(lockFill),
            children: [
              {
                title: 'Saved Project Estimate Template',
                path: '/dashboard/project/savedEstimateTemplate',
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
            icon: getIcon(alertTriangleFill)
          },
          {
            title: 'Time Card',
            path: '/dashboard/timeCard',
            icon: getIcon(timeCardIcon),
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
    } else if (role === 'ROLE_USER') {
      sidebarConfig = [
        {
          title: 'Time Card',
          path: '/dashboard/timeCard',
          icon: getIcon(timeCardIcon),
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
          title: 'Certificates',
          path: '/dashboard/certificates',
          icon: getIcon(certificatesIcon)
        }
      ];
    }

    return sidebarConfig;
  };
}
