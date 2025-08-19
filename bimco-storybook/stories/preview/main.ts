import Alpine from 'alpinejs';
import AsyncAlpine from 'async-alpine';
import { registerAsyncData } from '../base/alpine/register-async-data';

import '../vendors/fontawesome';

Alpine.plugin(AsyncAlpine);

Alpine.asyncOptions({ defaultStrategy: 'idle' });

registerAsyncData();

Alpine.start();
