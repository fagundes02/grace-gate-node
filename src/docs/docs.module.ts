import ChurchCreateDocs from '@app/church/docs/church-create.docs'
import DefaultDocs from '@app/docs/docs/default.docs'
import HealthCheckCreateDocs from '@app/healthcheck/docs/healthcheck-create.docs'
import HealthCheckDocs from '@app/healthcheck/docs/healthcheck.docs'

export default [new DefaultDocs(), new HealthCheckDocs(), new HealthCheckCreateDocs(), new ChurchCreateDocs()]
