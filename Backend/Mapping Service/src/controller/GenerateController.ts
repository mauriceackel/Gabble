import { Request, Response, Router } from 'express'
import { NextFunction } from 'connect'
import { ApiResponse, ErrorResponse } from '../utils/responses/ApiResponse';
import * as GeneratorService from '../services/MappingGenerator/MappingGeneratorService'
import { IMappingPair, MappingDirection } from '../models/MappingModel';
import { IOperation } from '../models/OperationModel';
import { MappingGenerationResponse } from '../utils/responses/MappingGenerationResponse';

//Reference to express
const router: Router = Router();

/**
 * Generate a mapping
 */
router.post('/', generateMapping)
async function generateMapping(req: Request, res: Response, next: NextFunction) {

    const { source, targets, direction } = req.body as { source: IOperation, targets: { [key: string]: IOperation }, direction?: MappingDirection };

    let response: ApiResponse;
    try {
        const mapping = await GeneratorService.generateMapping(source, targets, direction);

        response = new MappingGenerationResponse(200, undefined, mapping);
    } catch (err) {
        response = new ErrorResponse(500, [err]);
    }
    res.status(response.Code).json(response);
}

/**
 * Generate a mapping
 */
router.post('/attribute', generateAttributeMapping)
async function generateAttributeMapping(req: Request, res: Response, next: NextFunction) {
    const { source, targets, direction, mappingPairs } = req.body as { source: IOperation, targets: { [key: string]: IOperation }, mappingPairs: IMappingPair[], direction?: MappingDirection };

    let response: ApiResponse;
    try {
        const mapping = await GeneratorService.generateAttributeMappingOnly(source, targets, mappingPairs, direction);

        response = new MappingGenerationResponse(200, undefined, mapping);
    } catch (err) {
        response = new ErrorResponse(500, [err]);
    }
    res.status(response.Code).json(response);
}

export default router;