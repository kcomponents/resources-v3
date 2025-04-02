export const constants = {
  SYSTEM_ID: 'BASE',
  VERSION: '1.0.0-SNAPSHOT',
  SERVICES: {
    BASE_SERVICES: {
      CONTEXT: '/baseServices',
      APIV1: {
        PATH: '/api/v1',
        CONTROLLERS: {
          PERSONS: '/persons',
          SERVICES: '/services',
          PAYMENTS: '/payments',
          PARAMETERS: '/parameters'
        }
      },
      APIV2: {
        PATH: '/api/v2',
        CONTROLLERS: {
          PERSONS: '/persons'
        }
      }
    }
  },
  MESSAGES: {
    PERSON:{
      SAVE: 'Persona registrada con éxito',
      UPDATE: 'Persona modificada con éxito',
      DELETE: 'eliminada con éxito',
      CONFIRM_DELETE: '<br>¿Está seguro de eliminar este elemento?'
    },
    PARAMETERS:{
      SAVE: 'Parámetro registrado con éxito',
      UPDATE: 'Parámetro modificado con éxito',
      DELETE: 'eliminado con éxito',
      CONFIRM_DELETE: '<br>¿Está seguro de eliminar este elemento?'
    }
  }
};
