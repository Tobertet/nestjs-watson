import { Module, DynamicModule, Global } from '@nestjs/common';
import * as WatsonDiscovery from 'watson-developer-cloud/discovery/v1-generated';
import * as fs from 'fs';
import * as path from 'path';

export { WatsonDiscovery };

@Global()
@Module({

})
export class WatsonDiscoveryModule {

    static forRoot(options?: WatsonDiscovery.Options): DynamicModule {

        if (!options) {
            // TODO habría que decirle a webpack que copie watson.config.json a dist si existe
            const watsonConfigFile = path.join(process.cwd(), 'watson.config.json');
            try {
                options = JSON.parse(fs.readFileSync(watsonConfigFile, 'utf8')).discovery;
            } catch (e) {
                throw new Error('Watson Discovery properties not found! Either define them when importing the module or provide them in a watson.config.json');
            }
        }

        if (!options) {
            throw new Error('Watson Discovery properties not found! Either define them when importing the module or provide them in a watson.config.json');
        }

        const watsonDiscoveryProvider = {
            provide: WatsonDiscovery,
            useValue: new WatsonDiscovery(options),
        };

        return {
            module: WatsonDiscoveryModule,
            providers: [watsonDiscoveryProvider],
            exports: [watsonDiscoveryProvider],
        };

    }

}
