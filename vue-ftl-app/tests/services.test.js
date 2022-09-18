import {it,describe,expect} from 'vitest';
import Services from '../src/services/Services'

describe('Service test', ()=>{
    it('should instantiate service',() => {
        const srv = new Services();
        expect(srv.forgeUrl("test")).toBe("http://127.0.0.1:3000/test");
    })
})