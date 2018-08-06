import { Module, DynamicModule, Global } from '@nestjs/common';
import * as WatsonAssistant from 'watson-developer-cloud/assistant/v1';
import * as fs from 'fs';
import * as path from 'path';

export { WatsonAssistant };

@Global()
@Module({

})
export class WatsonAssistantModule {

    static forRoot(options?: WatsonAssistant.Options): DynamicModule {

        if (!options) {
            // TODO habría que decirle a webpack que copie watson.config.json a dist si existe
            const watsonConfigFile = path.join(process.cwd(), 'watson.config.json');
            try {
                options = JSON.parse(fs.readFileSync(watsonConfigFile, 'utf8')).assistant;
            } catch (e) {
                throw new Error('Watson Assistant properties not found! Either define them when importing the module or provide them in a watson.config.json');
            }
        }

        if (!options) {
            throw new Error('Watson Assistant properties not found! Either define them when importing the module or provide them in a watson.config.json');
        }

        const watsonAssistantProvider = {
            provide: WatsonAssistant,
            useValue: new WatsonAssistant(options),
        };

        return {
            module: WatsonAssistantModule,
            providers: [watsonAssistantProvider],
            exports: [watsonAssistantProvider],
        };

    }

}
