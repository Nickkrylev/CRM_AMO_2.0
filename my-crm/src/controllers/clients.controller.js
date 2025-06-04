const svc = require("../services/clients.service");

exports.list    = async (_req, res, next) => { try { res.json(await svc.getAll()); } catch (e) { next(e); } };
exports.getById = async (req, res, next)  => { try { res.json(await svc.getById(+req.params.id)); } catch (e) { next(e); } };
exports.create  = async (req, res, next)  => { try { res.json(await svc.create(req.body)); } catch (e) { next(e); } };
exports.update  = async (req, res, next)  => { try { res.json(await svc.update(+req.params.id, req.body)); } catch (e) { next(e); } };
exports.remove  = async (req, res, next)  => { try { res.json(await svc.remove(+req.params.id)); } catch (e) { next(e); } };