import test from 'node:test';
import assert from 'node:assert/strict';
import {normalizeEvent} from '../api/hotmart.js';
const basic={id:'evt_1',event:'PURCHASE_APPROVED',creation_date:1794300000000,data:{product:{id:1234},buyer:{email:' Cliente@Ejemplo.com '}}};
test('approves a valid purchase',()=>assert.deepEqual(normalizeEvent(basic),{event_id:'evt_1',product_id:'1234',email:'cliente@ejemplo.com',active:true,occurred_at:new Date(1794300000000).toISOString(),event_type:'PURCHASE_APPROVED'}));
test('revokes a refunded purchase',()=>assert.equal(normalizeEvent({...basic,event:'PURCHASE_REFUNDED'}).active,false));
test('ignores unrelated notifications',()=>assert.deepEqual(normalizeEvent({...basic,event:'SUBSCRIPTION_CANCELLATION'}),{ignored:true}));
test('rejects missing buyer',()=>assert.equal(normalizeEvent({...basic,data:{product:{id:1234}}}),null));
test('rejects missing event id',()=>assert.equal(normalizeEvent({...basic,id:''}),null));
